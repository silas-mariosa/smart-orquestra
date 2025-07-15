'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { Check, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import FormSchemaUsers from "./formSchema";
import UsersHook from "./userHook";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SheetModel } from "@/components/sheetUsers/sheetMenuUsers";

export default function Users() {
	const { form } = FormSchemaUsers()
	const { formSchema, onSubmit, filterUsers, resetForm } = UsersHook()

	const sortedFilteredData = filterUsers
		.filter((user: any) => user.accessLevel === 'Administrador')
		.sort((a: any, b: any) => {
			if (a.nome < b.nome) {
				return -1;
			}
			if (a.nome > b.nome) {
				return 1;
			}
			return 0;
		});

	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage] = useState(10);
	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;

	const currentRows = sortedFilteredData.slice(
		indexOfFirstRow,
		indexOfLastRow
	);

	const totalPages = Math.ceil(sortedFilteredData.length / rowsPerPage);
	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	const nextPage = () => {
		if (indexOfLastRow < sortedFilteredData.length) {
			setCurrentPage(currentPage + 1);
		}
	};


	return (
		<>
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Filtro de membros</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name={"name"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{"Nomo de membro"}</FormLabel>
											<FormControl>
												<Input placeholder={"Buscar por nome do membro"} type={"text"} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="actived"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Buscar por nível de acesso">
															{field.value !== undefined
																? field.value
																: "Buscar por nível de acesso"}
														</SelectValue>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Administrador">Administrador</SelectItem>
													<SelectItem value="Membro">Membro</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex justify-end gap-6">
								<Button type="button" onClick={() => {
									form.reset();
									resetForm()
								}}>Limpar</Button>
								<Button onClick={() => setCurrentPage(1)} type="submit">Filtrar</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card className="p-2 mx-4 rounded-sm mt-4">
				<div className="flex justify-end m-4">
					<SheetModel titulo="Adicionar membro" subtitulo="Adicionar membro" />
				</div>
				<Table>
					<TableHeader className="bg-gray-100">
						<TableRow className="grid-cols-6">
							<TableHead className="col-span-1">Nome do membro</TableHead>
							<TableHead className="col-span-1">E-mail</TableHead>
							<TableHead className="col-span-1">Ativo?</TableHead>
							<TableHead className="col-span-1">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentRows.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="col-span-1">{user.name}</TableCell>
								<TableCell className="col-span-1">{user.email}</TableCell>
								<TableCell className="col-span-1">{user.actived}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<span className="sr-only">Open menu</span>
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem
												onClick={() => alert(`Editar ${user.name}`)}
											>
												Detalhes
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className="flex justify-center items-center mt-4">
					{totalPages > 1 ? (
						<>
							<Button
								variant="outline"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage(1)}
							>
								{totalPages / totalPages}
							</Button>
							<Button
								variant="ghost"
								disabled={currentPage === 1}
								onClick={prevPage}
							>
								<ChevronLeft />
							</Button>
							<div className="mx-2">
								<Badge variant="outline" className="text-sm">{currentPage}</Badge>
							</div>
							<Button
								variant="ghost"
								disabled={indexOfLastRow >= sortedFilteredData.length}
								onClick={nextPage}
							>
								<ChevronRight />
							</Button>
							<Button
								variant="outline"
								disabled={indexOfLastRow >= sortedFilteredData.length}
								onClick={() => setCurrentPage(totalPages)}
							>
								{totalPages}
							</Button>
						</>
					)
						:
						<div className="mx-2">
							<Badge variant="outline" className="text-sm">{currentPage}</Badge>
						</div>
					}
				</div>
			</Card>
		</>
	);
}