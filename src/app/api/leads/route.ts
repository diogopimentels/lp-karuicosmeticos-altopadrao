import { NextResponse } from "next/server";

import { registerLeadInAgendor } from "@/lib/agendor";
import { appendLeadToSheet } from "@/lib/sheets";
import { leadSchema, normalizeWhatsappDigits } from "@/lib/validation";
import {
  buildWhatsappRedirectUrl,
  getConfiguredWhatsappNumber,
} from "@/lib/whatsapp";

export const runtime = "nodejs";

type RateBucket = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const rateBuckets = new Map<string, RateBucket>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateBuckets.get(ip);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  rateBuckets.set(ip, current);
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Muitas tentativas em pouco tempo. Aguarde um momento e tente novamente.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          ok: false,
          message: "Revise os campos do formulário.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ ok: true, whatsappUrl: null }, { status: 200 });
    }

    const destination = getConfiguredWhatsappNumber();
    if (!destination) {
      console.error("KARUI_WHATSAPP_NUMBER ausente.");
      return NextResponse.json(
        {
          ok: false,
          message:
            "Não foi possível concluir o envio no momento. Tente novamente em instantes.",
        },
        { status: 503 },
      );
    }

    const now = new Date();
    const dataHora = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
      timeZone: "America/Sao_Paulo",
    }).format(now);

    const whatsappLead = normalizeWhatsappDigits(data.whatsappLead);

    // Etapa 1: Google Sheets (backup operacional)
    await appendLeadToSheet({
      dataHora,
      nomeCompleto: data.nomeCompleto,
      emailProfissional: data.emailProfissional,
      whatsappLead,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      utmTerm: data.utmTerm,
      utmContent: data.utmContent,
      paginaOrigem: data.paginaOrigem,
      referrer: data.referrer,
    });

    // Etapa 2: Agendor (pessoa + negócio no funil)
    await registerLeadInAgendor({
      nomeCompleto: data.nomeCompleto,
      emailProfissional: data.emailProfissional,
      whatsappLead,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      paginaOrigem: data.paginaOrigem,
    });

    // Etapa 3: WhatsApp (somente após Sheets + Agendor)
    const firstName = data.nomeCompleto.split(/\s+/)[0];
    const whatsappUrl = buildWhatsappRedirectUrl({
      destinationNumber: destination,
      firstName,
    });

    return NextResponse.json({ ok: true, whatsappUrl });
  } catch (error) {
    console.error("Falha ao registrar lead:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Não foi possível registrar seus dados agora. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }
}
