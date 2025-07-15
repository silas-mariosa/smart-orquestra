import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/context/useProvider";

export const metadata: Metadata = {
  title: "Smart Orquestra",
  description: "Deselvolvido por Mariosa Tech",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
