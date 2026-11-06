import "server-only";

type AgendorLeadInput = {
  nomeCompleto: string;
  emailProfissional: string;
  whatsappLead: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  paginaOrigem?: string | null;
};

type AgendorResponse<T> = {
  data?: T;
  errors?: unknown;
  message?: string;
};

type AgendorPerson = {
  id: number;
  name?: string;
};

type AgendorDeal = {
  id: number;
  title?: string;
};

const AGENDOR_API_BASE = "https://api.agendor.com.br/v3";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }
  return value;
}

function getToken(): string {
  return requireEnv("AGENDOR_API_TOKEN");
}

function getFunnelId(): number {
  const raw = process.env.AGENDOR_FUNNEL_ID?.trim() || "813360";
  const id = Number(raw);
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error("AGENDOR_FUNNEL_ID inválido.");
  }
  return id;
}

function getDealStage(): number {
  const raw = process.env.AGENDOR_DEAL_STAGE?.trim() || "1";
  const stage = Number(raw);
  if (!Number.isFinite(stage) || stage <= 0) {
    throw new Error("AGENDOR_DEAL_STAGE inválido.");
  }
  return stage;
}

const DEFAULT_LEAD_ORIGIN =
  "Landing Page Karuí Cosméticos/Alto Padrão Invisível";

function getLeadOrigin(): string {
  return process.env.AGENDOR_LEAD_ORIGIN?.trim() || DEFAULT_LEAD_ORIGIN;
}

function formatMobile(whatsappDigits: string): string {
  const digits = whatsappDigits.replace(/\D/g, "");
  if (digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

async function agendorFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${AGENDOR_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | AgendorResponse<T>
    | T
    | null;

  if (!response.ok) {
    const details =
      payload && typeof payload === "object"
        ? JSON.stringify(payload).slice(0, 500)
        : String(response.status);
    throw new Error(`Agendor ${path} falhou (${response.status}): ${details}`);
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as AgendorResponse<T>).data as T;
  }

  return payload as T;
}

function buildDescription(lead: AgendorLeadInput): string {
  const lines = [
    `Origem: ${getLeadOrigin()}`,
    "Lead captado na landing de Marketing Olfativo de Alto Padrão.",
    `WhatsApp informado: ${lead.whatsappLead}`,
  ];

  if (lead.paginaOrigem) lines.push(`Página: ${lead.paginaOrigem}`);
  if (lead.utmSource) lines.push(`utm_source: ${lead.utmSource}`);
  if (lead.utmMedium) lines.push(`utm_medium: ${lead.utmMedium}`);
  if (lead.utmCampaign) lines.push(`utm_campaign: ${lead.utmCampaign}`);

  return lines.join("\n");
}

export async function upsertPersonInAgendor(
  lead: AgendorLeadInput,
): Promise<AgendorPerson> {
  const mobile = formatMobile(lead.whatsappLead);

  return agendorFetch<AgendorPerson>("/people/upsert", {
    method: "POST",
    body: JSON.stringify({
      name: lead.nomeCompleto,
      leadOrigin: getLeadOrigin(),
      description: buildDescription(lead),
      contact: {
        email: lead.emailProfissional,
        mobile,
        whatsapp: mobile,
      },
    }),
  });
}

export async function createDealInAgendor(params: {
  personId: number;
  nomeCompleto: string;
  emailProfissional: string;
  description: string;
}): Promise<AgendorDeal> {
  // Título único por envio — o Agendor bloqueia negócio repetido com o mesmo título
  const stamp = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  return agendorFetch<AgendorDeal>(`/people/${params.personId}/deals`, {
    method: "POST",
    body: JSON.stringify({
      title: `${getLeadOrigin()} — ${params.nomeCompleto} — ${stamp}`,
      description: params.description,
      funnel: getFunnelId(),
      dealStage: getDealStage(),
    }),
  });
}

function isDuplicateDealTitleError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /only be one deal with this title/i.test(message);
}

export async function registerLeadInAgendor(
  lead: AgendorLeadInput,
): Promise<{ personId: number; dealId: number | null }> {
  const person = await upsertPersonInAgendor(lead);

  if (!person?.id) {
    throw new Error("Agendor não retornou o ID da pessoa.");
  }

  try {
    const deal = await createDealInAgendor({
      personId: person.id,
      nomeCompleto: lead.nomeCompleto,
      emailProfissional: lead.emailProfissional,
      description: buildDescription(lead),
    });

    if (!deal?.id) {
      throw new Error("Agendor não retornou o ID do negócio.");
    }

    return { personId: person.id, dealId: deal.id };
  } catch (error) {
    // Reenvio do mesmo lead: pessoa já existe e o negócio também.
    // Não derruba o fluxo depois do Sheets.
    if (isDuplicateDealTitleError(error)) {
      console.warn(
        "Agendor: negócio duplicado para a pessoa; seguindo com sucesso.",
        { personId: person.id },
      );
      return { personId: person.id, dealId: null };
    }
    throw error;
  }
}
