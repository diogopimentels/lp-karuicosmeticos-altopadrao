import { normalizeWhatsappDigits } from "@/lib/validation";

export function buildWhatsappRedirectUrl(params: {
  destinationNumber: string;
  firstName?: string;
}): string {
  const digits = normalizeWhatsappDigits(params.destinationNumber);

  if (!digits) {
    throw new Error("KARUI_WHATSAPP_NUMBER não configurado.");
  }

  const greetingName = params.firstName?.trim().split(/\s+/)[0];
  const message = greetingName
    ? `Olá! Meu nome é ${greetingName}. Acabei de solicitar informações sobre Marketing Olfativo de Alto Padrão da Karuí e gostaria de saber mais.`
    : "Olá! Acabei de solicitar informações sobre Marketing Olfativo de Alto Padrão da Karuí e gostaria de saber mais.";

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getConfiguredWhatsappNumber(): string | null {
  const value = process.env.KARUI_WHATSAPP_NUMBER?.trim();
  return value || null;
}
