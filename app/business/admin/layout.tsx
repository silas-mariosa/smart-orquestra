import HeaderBar from "@/components/headerBar";
import SideBar from "@/components/sideBar";
import { ItensSideBar } from "../membros/layout";
import { GroupIcon, GuitarIcon, LayoutDashboardIcon, ListMusic, LogOut, Monitor, Users2, UserSearchIcon } from "lucide-react";

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
                name: "Categorias",
                icon: <ListMusic className="w-8 h-8" />,
                link: "/business/admin/categorias",
            },
            {
                name: "Calendário",
                icon: <LayoutDashboardIcon className="w-8 h-8" />,
                link: "/business/admin/calendario",
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

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SideBar sideBarItems={sideBarItems}>
                <HeaderBar />
                {children}
            </SideBar>
        </>
    );
}
