import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

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
                {children}
                <Toaster />
            </body>
        </html>
    );
}
