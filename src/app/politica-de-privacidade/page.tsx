import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Karuí Cosméticos",
  description:
    "Saiba como a Karuí Cosméticos trata os dados pessoais coletados nesta landing page, em conformidade com a LGPD.",
};

const updatedAt = "6 de novembro de 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ink text-ivory">
      <header className="border-b border-ivory/8">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 md:px-8">
          <Link href="/" aria-label="Voltar para a página inicial">
            <Image
              src="/images/logo.png"
              alt="Karuí Cosméticos"
              width={72}
              height={72}
              className="h-14 w-14 object-contain"
            />
          </Link>
          <Link
            href="/"
            className="text-[0.72rem] font-semibold tracking-[0.18em] text-gold uppercase transition-colors hover:text-ivory"
          >
            Voltar
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-14 md:px-8 md:py-20">
        <p className="text-[0.72rem] tracking-[0.28em] text-gold uppercase">
          Karuí Cosméticos
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[-0.02em] md:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-muted">Última atualização: {updatedAt}</p>

        <div className="mt-12 space-y-10 text-[1.02rem] leading-relaxed text-muted">
          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">1. Quem somos</h2>
            <p>
              Esta Política de Privacidade descreve como a{" "}
              <strong className="font-medium text-ivory">Karuí Cosméticos</strong>{" "}
              (“Karuí”, “nós”) trata os dados pessoais coletados por meio desta
              landing page de Marketing Olfativo de Alto Padrão, em conformidade
              com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>
            <p>
              A Karuí atua como controladora dos dados pessoais tratados para as
              finalidades descritas abaixo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              2. Quais dados coletamos
            </h2>
            <p>
              No formulário de contato desta página, coletamos apenas os dados
              necessários para o retorno comercial:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Nome completo</li>
              <li>E-mail profissional</li>
              <li>WhatsApp com DDD</li>
            </ul>
            <p>
              Também podemos registrar, de forma automática e complementar,
              informações técnicas de origem da visita quando disponíveis, como
              parâmetros UTM, página de origem e referrer. Esses dados ajudam a
              entender de onde veio o contato e não são usados para perfilamento
              indevido.
            </p>
            <p>
              Não solicitamos dados sensíveis neste formulário e não coletamos
              mais informações do que as necessárias para o atendimento
              comercial.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              3. Para que usamos seus dados
            </h2>
            <p>Utilizamos os dados pessoais para:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Entrar em contato sobre Marketing Olfativo de Alto Padrão e
                soluções da Karuí
              </li>
              <li>
                Registrar e organizar leads comerciais em ambiente controlado
              </li>
              <li>
                Melhorar o atendimento e a análise de origem das solicitações
              </li>
              <li>Cumprir obrigações legais e regulatórias, quando aplicável</li>
            </ul>
            <p>
              A base legal principal para esse tratamento é a{" "}
              <strong className="font-medium text-ivory">
                execução de procedimentos preliminares relacionados a contrato
              </strong>{" "}
              e o{" "}
              <strong className="font-medium text-ivory">
                legítimo interesse
              </strong>{" "}
              da Karuí em responder solicitações comerciais iniciadas por você,
              sem prejuízo de outras bases cabíveis na LGPD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              4. Como armazenamos e com quem compartilhamos
            </h2>
            <p>
              Os dados do formulário são registrados em planilha Google Sheets
              administrada pela Karuí e podem ser tratados em infraestrutura de
              hospedagem da aplicação (por exemplo, Vercel) apenas o necessário
              para o funcionamento do envio.
            </p>
            <p>
              Após o cadastro, você pode ser redirecionado ao WhatsApp comercial
              da Karuí para continuidade do atendimento. O número de WhatsApp
              informado no formulário é um dado do lead e não se confunde com o
              canal comercial de destino da Karuí.
            </p>
            <p>
              Não vendemos seus dados pessoais. O compartilhamento ocorre apenas
              com prestadores estritamente necessários à operação (como Google e
              provedor de hospedagem), sob dever de confidencialidade e dentro
              das finalidades desta política.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              5. Por quanto tempo guardamos
            </h2>
            <p>
              Mantemos os dados pelo tempo necessário para o relacionamento
              comercial decorrente da sua solicitação e para cumprimento de
              obrigações legais. Quando não houver mais necessidade, os dados
              poderão ser eliminados ou anonimizados, salvo hipóteses de
              retenção exigidas por lei.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              6. Seus direitos (LGPD)
            </h2>
            <p>Você pode solicitar à Karuí, nos termos da LGPD:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Confirmação da existência de tratamento</li>
              <li>Acesso aos dados</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>
                Anonimização, bloqueio ou eliminação de dados desnecessários ou
                excessivos
              </li>
              <li>
                Informação sobre compartilhamentos e possibilidade de negar
                consentimento, quando essa for a base utilizada
              </li>
              <li>Revogação de consentimento, quando aplicável</li>
            </ul>
            <p>
              Também é possível apresentar reclamação à Autoridade Nacional de
              Proteção de Dados (ANPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">7. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais razoáveis para proteger
              os dados contra acessos não autorizados, perda ou alteração
              indevida, incluindo validação server-side do formulário e restrição
              de credenciais de integração ao ambiente de servidor.
            </p>
            <p>
              Nenhum sistema é absolutamente isento de riscos. Em caso de
              incidente relevante, a Karuí adotará as medidas cabíveis,
              inclusive comunicação quando exigido pela legislação.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              8. Cookies e mensuração
            </h2>
            <p>
              Esta versão da landing page não utiliza trackers de marketing
              sem configuração e autorização específicas da Karuí. Caso
              ferramentas de mensuração sejam adicionadas no futuro, esta
              política será atualizada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              9. Como falar sobre privacidade
            </h2>
            <p>
              Para exercer direitos ou esclarecer dúvidas sobre esta Política de
              Privacidade, entre em contato com a Karuí Cosméticos pelos canais
              comerciais disponibilizados nesta página (incluindo o WhatsApp
              comercial após o envio do formulário).
            </p>
            <p>
              Dados cadastrais completos do controlador (como CNPJ e endereço)
              poderão ser complementados nesta página assim que forem
              formalmente disponibilizados pela empresa.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ivory">
              10. Atualizações
            </h2>
            <p>
              Esta política pode ser atualizada para refletir mudanças legais,
              operacionais ou de produto. A data de atualização será sempre
              indicada no topo desta página.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
