import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-ivory/8 bg-ink px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Karuí Cosméticos"
            width={72}
            height={72}
            className="h-14 w-14 object-contain"
          />
          <p className="text-sm text-muted">
            Marketing Olfativo de Alto Padrão
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <a
            href="/politica-de-privacidade"
            className="text-sm text-muted transition-colors hover:text-gold"
          >
            Política de Privacidade
          </a>
          <p className="text-xs tracking-[0.14em] text-muted uppercase">
            © {new Date().getFullYear()} Karuí
          </p>
        </div>
      </div>
    </footer>
  );
}
