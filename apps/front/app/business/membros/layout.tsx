import HeaderBar from "@/components/headerBar";
import SideBar from "@/components/sideBar";
import { FileMusic, LayoutDashboardIcon, ListMusic, LogOut, MonitorCogIcon, UserRoundPen } from "lucide-react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
	title: "Members - Smart Orquestra",
	description: "Deselvolvido por Mariosa Tech",
};


export type ItemSideBar = {
	name: string;
	icon: React.ReactNode;
	link: string;
	func?: () => void;
}

export type ItensSideBar = {
	category: "menu" | "config";
	items: ItemSideBar[];
}


const sideBarItems: ItensSideBar[] = [
	{
		category: "menu",
		items: [
			{
				name: "Dashboard",
				icon: <LayoutDashboardIcon className="w-8 h-8" />,
				link: "/business/membros",
			},
			{
				name: "Perfil",
				icon: <UserRoundPen className="w-8 h-8" />,
				link: "/business/membros/perfil",
			},
			{
				name: "Louvores",
				icon: <FileMusic className="w-8 h-8" />,
				link: "/business/membros/louvores",
			},
			{
				name: "Grupos",
				icon: <ListMusic className="w-8 h-8" />,
				link: "/business/membros/grupos",
			},
		],
	},
	{
		category: "config",
		items: [
			{
				name: "Admin",
				icon: <MonitorCogIcon className="w-8 h-8" />,
				link: "/business/admin",
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
					<Toaster />
				</SideBar>
			</body>
		</html>
	);
}
