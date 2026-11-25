import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rastro | Painel do creator",
  description:
    "Dashboard demonstrativa do Rastro: ganhos, projeções transparentes e consistência para creators.",
  applicationName: "Rastro",
  icons: { icon: "/rastro-mark.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
