import HeaderBar from "@/components/headerBar";
import SideBar from "@/components/sideBar";
import type { Metadata } from "next";
import { ItensSideBar } from "../membros/layout";
import { GroupIcon, GuitarIcon, LayoutDashboardIcon, ListMusic, LogOut, Monitor, Users2, UserSearchIcon } from "lucide-react";

export const metadata: Metadata = {
    title: "Admin - Smart Orquestra",
    description: "Deselvolvido por Mariosa Tech",
};


const sideBarItems: ItensSideBar[] = [
    {
        category: "menu",
        items: [
            {
                name: "Dashboard",
                icon: <LayoutDashboardIcon className="w-8 h-8" />,
                link: "/business/admin",
            },
            {
                name: "Membros",
                icon: <UserSearchIcon className="w-8 h-8" />,
                link: "/business/admin/membros",
            },
            {
                name: "Instrumentos",
                icon: <GuitarIcon className="w-8 h-8" />,
                link: "/business/admin/instrumentos",
            },
            {
                name: "Louvores",
                icon: <ListMusic className="w-8 h-8" />,
                link: "/business/admin/louvores",
            },
            {
                name: "Grupos",
                icon: <GroupIcon className="w-8 h-8" />,
                link: "/business/admin/grupos",
            },
            {
                name: "Usuários",
                icon: <Users2 className="w-8 h-8" />,
                link: "/business/admin/users",
            },
        ],
    },
    {
        category: "config",
        items: [
            {
                name: "Admin",
                icon: <Monitor className="w-8 h-8" />,
                link: "/business/membros",
            },
            {
                name: "Sair",
                icon: <LogOut className="w-8 h-8" />,
                link: "/business/login",
            },
        ],
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body>
                <SideBar sideBarItems={sideBarItems}>
                    <HeaderBar />
                    {children}
                </SideBar>
            </body>
        </html>
    );
}
