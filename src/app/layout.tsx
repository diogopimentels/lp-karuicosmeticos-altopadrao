import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import { MetaPixel } from "@/components/MetaPixel";

import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karuí Cosméticos | Marketing Olfativo de Alto Padrão",
  description:
    "Estratégia de Marketing Olfativo de Alto Padrão que eleva o valor percebido da sua marca. Terceirize com a excelência Karuí.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Karuí Cosméticos | Marketing Olfativo de Alto Padrão",
    description:
      "Descubra como o olfato cria desejo e fortalece a experiência da sua marca.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
