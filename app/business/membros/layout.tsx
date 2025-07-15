import HeaderBar from "@/components/headerBar";
import SideBar from "@/components/sideBar";
import { FileMusic, LayoutDashboardIcon, ListMusic, LogOut, MonitorCogIcon, UserRoundPen } from "lucide-react";

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
				name: "Calendário",
				icon: <LayoutDashboardIcon className="w-8 h-8" />,
				link: "/business/membros/calendario",
			},
			// Removido o botão de Grupos
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

export default function MembrosLayout({
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
