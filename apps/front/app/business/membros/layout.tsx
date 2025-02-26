import HeaderBar from "@/components/headerBar";
import SideBar from "@/components/sideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Members - Smart Orquestra",
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
                <SideBar>
                    <HeaderBar />
                    {children}
                </SideBar>
            </body>
        </html>
    );
}
