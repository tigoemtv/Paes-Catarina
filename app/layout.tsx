import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pães Catarina | Feito em casa, feito com amor",
  description: "Pães artesanais, cucas alemãs, enrolados, empadão e geleias. Conheça nosso cardápio e encomende pelo WhatsApp.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}

