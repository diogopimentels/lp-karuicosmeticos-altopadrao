import { z } from "zod";

const honeypotSchema = z.string().max(0).optional().or(z.literal(""));

export const leadSchema = z.object({
  nomeCompleto: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo.")
    .max(120, "Nome muito longo.")
    .regex(/^[\p{L}\p{M}'’.\-\s]+$/u, "Use apenas letras e espaços no nome."),
  emailProfissional: z
    .string()
    .trim()
    .toLowerCase()
    .email("Informe um e-mail profissional válido.")
    .max(180, "E-mail muito longo."),
  whatsappLead: z
    .string()
    .trim()
    .transform((value) => value.replace(/[^\d+]/g, ""))
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 13;
    }, "Informe um WhatsApp com DDD (10 a 13 dígitos)."),
  website: honeypotSchema,
  utmSource: z.string().trim().max(120).optional().nullable(),
  utmMedium: z.string().trim().max(120).optional().nullable(),
  utmCampaign: z.string().trim().max(120).optional().nullable(),
  utmTerm: z.string().trim().max(120).optional().nullable(),
  utmContent: z.string().trim().max(120).optional().nullable(),
  paginaOrigem: z.string().trim().max(500).optional().nullable(),
  referrer: z.string().trim().max(500).optional().nullable(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function normalizeWhatsappDigits(value: string): string {
  return value.replace(/\D/g, "");
}
