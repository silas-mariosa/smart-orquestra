'use client'

import React from "react";
import Image from "next/image";
import { CogIcon, FileMusic, LayoutDashboardIcon, ListMusic, LogOut, MonitorCogIcon, UserRoundPen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ItensSideBar } from "@/app/business/membros/layout";

interface SideBarProps {
	children?: React.ReactNode;
	sideBarItems: ItensSideBar[];
}



export default function SideBar({ children, sideBarItems }: SideBarProps) {
	if (children === null || children === undefined) {
		throw new Error("Children is null or undefined");
	}

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
										<a className="flex items-center rounded-sm p-2 hover:bg-white hover:text-[#25508C] mb-2" href={item.link}>
											{item.icon}
										</a>
									</div>
								))) :
								(
									<div className="fixed bottom-4 left-9 -translate-x-1/2">
										<DropdownMenu>
											<DropdownMenuTrigger className="hover:bg-white hover:text-[#25508C] p-2 rounded-sm"><CogIcon className="w-8 h-8" /></DropdownMenuTrigger>
											<DropdownMenuContent className="flex flex-col justify-center items-center min-w-[2rem] text-[#25508C] gap-6">
												{
													item.items.map((item) => (
														<DropdownMenuItem className="hover:bg-[#25508C] hover:text-white">
															<a key={item.name} href={item.link}>
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
					{/* <SheetSideBar /> */}
				</div>
			</div>
			<div className="flex flex-col w-full">{children}</div>
		</div>
	);
}
