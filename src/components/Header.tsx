import Image from "next/image";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-7xl items-start justify-start px-6 pb-4 pt-6 md:px-10 lg:px-12">
        <Image
          src="/images/logo.png"
          alt="Karuí Cosméticos"
          width={112}
          height={112}
          priority
          className="h-16 w-16 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:h-[5.5rem] md:w-[5.5rem]"
        />
      </div>
    </header>
  );
}
