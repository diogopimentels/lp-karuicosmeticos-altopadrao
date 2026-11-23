import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Em manutenção | Karuí Cosméticos",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ManutencaoPage() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-6">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(198,165,106,0.1),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Image
          src="/images/logo.png"
          alt="Karuí Cosméticos"
          width={96}
          height={96}
          priority
          className="h-20 w-20 object-contain md:h-24 md:w-24"
        />
        <p className="mt-10 font-sans text-[0.72rem] font-medium uppercase tracking-[0.28em] text-gold">
          Karuí Cosméticos
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[-0.02em] text-ivory md:text-5xl">
          Em manutenção
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Voltamos em breve.
        </p>
      </div>
    </main>
  );
}
