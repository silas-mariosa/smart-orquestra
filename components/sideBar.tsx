'use client'

import React from "react";
import Image from "next/image";
import { CogIcon, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ItensSideBar } from "@/app/business/membros/layout";
import { usePathname, useRouter } from "next/navigation";
import { useCookie } from "@/context/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface SideBarProps {
	children?: React.ReactNode;
	sideBarItems: ItensSideBar[];
}

// Componente SheetSideBar para mobile
function SheetSideBar({ sideBarItems }: { sideBarItems: ItensSideBar[] }) {
	const pathName = usePathname();
	const { removeCookie, userData } = useCookie();
	const { push } = useRouter();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="p-2 text-white hover:bg-white/10 rounded-md">
					<Menu className="w-6 h-6" />
				</button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[280px] bg-[#25508C] text-white p-0">
				<div className="flex flex-col h-full">
					<div className="flex justify-center items-center h-[50px] mt-2 mb-10">
						<Image src="/piano.png" alt="Logo" width={50} height={50} />
					</div>
					<div className="flex-1 px-4">
						{sideBarItems.map((item) => (
							item.category === "menu" ? (
								item.items.map((menuItem) => (
									<div key={menuItem.name} className="mb-2">
										<a
											className={`flex items-center rounded-sm p-3 w-full ${pathName === menuItem.link
												? "bg-white text-[#25508C]"
												: "hover:bg-white/10"
												}`}
											href={menuItem.link}
										>
											<span className="mr-3">{menuItem.icon}</span>
											<span className="font-medium">{menuItem.name}</span>
										</a>
									</div>
								))
							) : (
								<div key={item.category} className="mt-auto mb-4">
									<DropdownMenu>
										<DropdownMenuTrigger className="flex items-center w-full p-3 rounded-sm hover:bg-white/10">
											<span className="mr-3"><CogIcon className="w-6 h-6" /></span>
											<span className="font-medium">Configurações</span>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="min-w-[200px] text-[#25508C]">
											{item.items.map((subItem) => (
												<DropdownMenuItem
													key={subItem.name}
													className="hover:bg-[#25508C] hover:text-white cursor-pointer"
													disabled={subItem.name === "Admin" && userData?.accessLevel === "Membro"}
													onClick={() => {
														if (subItem.name === "Sair") {
															removeCookie("authTokenSmart");
															push("/business/login");
														}
													}}
												>
													<a href={subItem.link} className="flex items-center w-full">
														<span className="mr-3">{subItem.icon}</span>
														<span>{subItem.name}</span>
													</a>
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)
						))}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

export default function SideBar({ children, sideBarItems }: SideBarProps) {
	const pathName = usePathname();
	const { removeCookie, userData } = useCookie()
	if (children === null || children === undefined) {
		throw new Error("Children is null or undefined");
	}
	const { push } = useRouter();
	return (
		<div className="flex w-full relative bg-gray-200">
			<aside className="hidden sm:flex flex-col bg-[#25508C] text-white shadow-lg w-[75px] min-h-screen">
				<div className="flex justify-center items-center h-[50px] mt-2 mb-10">
					<Image src="/piano.png" alt="Logo" width={50} height={50}></Image>
				</div>
				<div className="relative">
					{
						sideBarItems.map((item,) => (
							item.category === "menu" ? (
								item.items.map((item) => (
									<div className="flex flex-col justify-center items-center" key={item.name}>
										<a className={`flex items-center rounded-sm p-2 ${pathName === item.link && "bg-white text-[#25508C]"} hover:bg-slate-400 hover:text-white mb-2`} href={item.link}>
											{item.icon}
										</a>
									</div>
								))) :
								(
									<div className="fixed bottom-4 left-9 -translate-x-1/2" key={item.category}>
										<DropdownMenu>
											<DropdownMenuTrigger className="hover:bg-white hover:text-[#25508C] p-2 rounded-sm"><CogIcon className="w-8 h-8" /></DropdownMenuTrigger>
											<DropdownMenuContent className="flex flex-col justify-center items-center min-w-[2rem] text-[#25508C] gap-6">
												{
													item.items.map((item) => (
														<DropdownMenuItem
															key={item.name}
															className="hover:bg-[#25508C] hover:text-white"
															disabled={item.name === "Admin" && userData?.accessLevel === "Membro"}
															onClick={() => {
																if (item.name === "Sair") {
																	removeCookie("authTokenSmart");
																	push("/business/login");
																}
															}}
														>
															<a href={item.link}>
																{item.icon}
															</a>
														</DropdownMenuItem>
													))
												}
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								)
						))
					}
				</div>
			</aside>
			<div className="sm:hidden bg-[#2563EB] top-0 w-full fixed h-[36px] z-10">
				<div className="flex flex-row justify-between mx-1 items-center">
					<h3 className={`pl-2 font-bold text-lg text-white`}>
						Smart Gabinete
					</h3>
					<SheetSideBar sideBarItems={sideBarItems} />
				</div>
			</div>
			<div className="flex flex-col w-full sm:pt-0 pt-[36px]">{children}</div>
		</div>
	);
}
