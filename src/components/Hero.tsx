import Image from "next/image";

import { Header } from "@/components/Header";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink">
      <Image
        src="/images/background-marmore.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.88)_0%,rgba(8,8,7,0.72)_42%,rgba(8,8,7,0.45)_68%,rgba(8,8,7,0.62)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(198,165,106,0.08),transparent_55%)]"
        aria-hidden
      />

      <Header />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 items-end gap-8 px-6 pb-16 pt-36 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-6 md:px-10 md:pb-20 md:pt-28 lg:px-12">
        <div className="relative z-10 max-w-xl">
          <p className="reveal font-sans text-[0.72rem] font-medium uppercase tracking-[0.32em] text-gold">
            Marketing Olfativo de Alto Padrão
          </p>

          <h1 className="reveal reveal-delay-1 mt-6 font-display text-[2.55rem] leading-[1.05] tracking-[-0.02em] text-ivory sm:text-[3.15rem] lg:text-[3.7rem]">
            O seu olho não vê, mas o seu cérebro já comprou.
          </h1>

          <p className="reveal reveal-delay-2 mt-6 max-w-md text-[1.02rem] leading-relaxed text-muted md:text-[1.08rem]">
            Descubra a estratégia de Marketing Olfativo de Alto Padrão que eleva
            o valor percebido da sua marca. Terceirize com a excelência Karuí.
          </p>

          <div className="reveal reveal-delay-3 mt-10">
            <a
              href="#formulario"
              className="gold-button inline-flex min-h-12 items-center justify-center px-7 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
            >
              Quero elevar o padrão da
              <br />
              minha marca
            </a>
          </div>
        </div>

        <div className="reveal reveal-delay-4 relative mx-auto w-full max-w-[440px] md:max-w-none md:justify-self-end">
          <div
            className="portrait-glow absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(198,165,106,0.18),transparent_68%)] blur-2xl"
            aria-hidden
          />

          <figure className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/foto-caio.jpeg"
              alt="Responsável pela Karuí Cosméticos"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 440px"
              className="object-cover object-[50%_18%]"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(8,8,7,0.55)_100%),linear-gradient(90deg,rgba(8,8,7,0.35)_0%,transparent_28%),linear-gradient(270deg,rgba(8,8,7,0.2)_0%,transparent_22%)]"
              aria-hidden
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
