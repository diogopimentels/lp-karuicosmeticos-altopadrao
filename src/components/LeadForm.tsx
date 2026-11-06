"use client";

import { FormEvent, useState } from "react";

import { trackLeadConversion } from "@/lib/meta-pixel";

type FieldErrors = Partial<
  Record<"nomeCompleto" | "emailProfissional" | "whatsappLead", string[]>
>;

type SubmitState = "idle" | "loading" | "error";

function readQueryParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

function firstError(errors?: string[]): string | undefined {
  return errors?.[0];
}

export function LeadForm() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [emailProfissional, setEmailProfissional] = useState("");
  const [whatsappLead, setWhatsappLead] = useState("");
  const [website, setWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitState>("idle");

  const isLoading = status === "loading";

  function showClientErrors(errors: FieldErrors, message: string) {
    setFieldErrors(errors);
    setFormError(message);
    setStatus("error");
    document.getElementById("formulario")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFormError(null);
    setFieldErrors({});

    const localErrors: FieldErrors = {};
    if (nomeCompleto.trim().length < 3) {
      localErrors.nomeCompleto = ["Informe seu nome completo."];
    } else if (!/^[\p{L}\p{M}'’.\-\s]+$/u.test(nomeCompleto.trim())) {
      localErrors.nomeCompleto = ["Use apenas letras e espaços no nome."];
    }
    if (!emailProfissional.trim().includes("@")) {
      localErrors.emailProfissional = ["Informe um e-mail profissional válido."];
    }
    const phoneDigits = whatsappLead.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      localErrors.whatsappLead = [
        "Informe um WhatsApp com DDD (10 a 13 dígitos).",
      ];
    }

    if (Object.keys(localErrors).length > 0) {
      showClientErrors(localErrors, "Revise os campos do formulário.");
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeCompleto,
          emailProfissional,
          whatsappLead,
          website,
          utmSource: readQueryParam("utm_source"),
          utmMedium: readQueryParam("utm_medium"),
          utmCampaign: readQueryParam("utm_campaign"),
          utmTerm: readQueryParam("utm_term"),
          utmContent: readQueryParam("utm_content"),
          paginaOrigem: `${window.location.pathname}${window.location.search}`,
          referrer: document.referrer,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        whatsappUrl?: string | null;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !payload.ok) {
        showClientErrors(
          payload.fieldErrors ?? {},
          payload.message ??
            "Não foi possível enviar agora. Tente novamente em instantes.",
        );
        return;
      }

      if (!payload.whatsappUrl) {
        showClientErrors(
          {},
          "Não foi possível abrir o WhatsApp agora. Tente novamente em instantes.",
        );
        return;
      }

      await trackLeadConversion();
      window.location.assign(payload.whatsappUrl);
    } catch {
      showClientErrors(
        {},
        "Falha de conexão. Verifique sua internet e tente novamente.",
      );
    }
  }

  return (
    <section
      id="formulario"
      className="border-t border-ivory/8 bg-ink px-6 py-24 md:px-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div>
          <h2 className="font-display text-3xl tracking-[-0.02em] text-ivory md:text-4xl">
            Eleve o padrão olfativo da sua marca
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Preencha os dados abaixo. Assim que o cadastro for confirmado, você
            será direcionado ao WhatsApp comercial da Karuí.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative space-y-5 border border-ivory/10 bg-stone/60 p-6 md:p-8"
          noValidate
        >
          <div className="space-y-2">
            <label
              htmlFor="nomeCompleto"
              className="block text-[0.72rem] tracking-[0.18em] text-muted uppercase"
            >
              Nome Completo
            </label>
            <input
              id="nomeCompleto"
              name="nomeCompleto"
              autoComplete="name"
              value={nomeCompleto}
              onChange={(event) => setNomeCompleto(event.target.value)}
              className="field-input"
              aria-invalid={Boolean(fieldErrors.nomeCompleto)}
              aria-describedby={
                fieldErrors.nomeCompleto ? "erro-nome" : undefined
              }
              required
            />
            {fieldErrors.nomeCompleto ? (
              <p id="erro-nome" className="text-sm text-danger">
                {firstError(fieldErrors.nomeCompleto)}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="emailProfissional"
              className="block text-[0.72rem] tracking-[0.18em] text-muted uppercase"
            >
              E-mail Profissional
            </label>
            <input
              id="emailProfissional"
              name="emailProfissional"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={emailProfissional}
              onChange={(event) => setEmailProfissional(event.target.value)}
              className="field-input"
              aria-invalid={Boolean(fieldErrors.emailProfissional)}
              aria-describedby={
                fieldErrors.emailProfissional ? "erro-email" : undefined
              }
              required
            />
            {fieldErrors.emailProfissional ? (
              <p id="erro-email" className="text-sm text-danger">
                {firstError(fieldErrors.emailProfissional)}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="whatsappLead"
              className="block text-[0.72rem] tracking-[0.18em] text-muted uppercase"
            >
              WhatsApp com DDD
            </label>
            <input
              id="whatsappLead"
              name="whatsappLead"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="11999999999"
              value={whatsappLead}
              onChange={(event) => setWhatsappLead(event.target.value)}
              className="field-input"
              aria-invalid={Boolean(fieldErrors.whatsappLead)}
              aria-describedby={
                fieldErrors.whatsappLead ? "erro-whatsapp" : undefined
              }
              required
            />
            {fieldErrors.whatsappLead ? (
              <p id="erro-whatsapp" className="text-sm text-danger">
                {firstError(fieldErrors.whatsappLead)}
              </p>
            ) : null}
          </div>

          {/* Honeypot anti-spam — nunca exibir na UI */}
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
          />

          {formError ? (
            <p
              role="alert"
              className="border border-danger/40 bg-danger/10 px-3 py-3 text-sm leading-relaxed text-danger"
            >
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="gold-button mt-2 flex min-h-13 w-full items-center justify-center px-6 text-center text-[0.7rem] font-semibold tracking-[0.16em] uppercase"
          >
            {isLoading
              ? "Enviando..."
              : "Quero elevar o padrão da minha marca"}
          </button>

          <p className="text-[0.78rem] leading-relaxed text-muted">
            Ao enviar, você concorda em ser contatado pela Karuí sobre Marketing
            Olfativo. Consulte a{" "}
            <a
              href="/politica-de-privacidade"
              className="text-gold underline decoration-gold/40 underline-offset-3 transition-colors hover:text-ivory"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
