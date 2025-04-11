'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { use, useEffect, useState } from "react";
import FormSchemaInstrumentos from "./formSchema";
import InstrumentoHook from "./instrumentosHook";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { SheetModel } from "@/components/sheetInstrumento/sheetMenuInstrumento";
import { CategoriesType } from "./IInstrumentosDTO";
import CategoriesHooks from "@/hooks/categoriesHooks/categoriesHooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Instrumentos() {
	const {
		categories,
		categoriesError,
		categoriesIsLoading,
		refetchCategories,
		deleteCategory
	} = CategoriesHooks()

	const { filteredData, onSubmit, resetForm, form } = InstrumentoHook()
	const [categoriaOptions, setCategoriaOptions] = useState<CategoriesType[]>([]);

	useEffect(() => {
		if (categories) {
			setCategoriaOptions(categories);
		}
	}, [categories]);
	console.log(filteredData)
	const sortedFilteredData = filteredData.sort((a: any, b: any) => {
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
					<CardTitle>Filtro de Instrumentos</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form id="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="flex flex-col gap-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={"nameInstrument"}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{"Nome do instrumento"}</FormLabel>
												<FormControl>
													<Input placeholder={"Buscar por instrumento"} type={"text"} {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="categories"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Categorias</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Selecione uma categoria" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{categoriaOptions.map((option) => (
															<SelectItem key={option.id} value={option.name}>
																{option.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

								</div>
								<div className="flex justify-end gap-6">
									<Button type="button" onClick={() => {
										resetForm()
									}}>Limpar</Button>
									<Button onClick={() => setCurrentPage(1)} type="submit">Filtrar</Button>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card className="p-4 mx-4 rounded-sm mt-4">
				<div className="flex justify-end items-center mb-4">
					<SheetModel titulo={"Instrumentos"} subtitulo="Cadastrar Instrumentos" categories={categoriaOptions} />
				</div>
				<Table>
					<TableHeader className="bg-gray-100">
						<TableRow className="grid-cols-2">
							<TableHead className="col-span-1">Instrumento</TableHead>
							<TableHead className="col-span-1">Categoria</TableHead>
							<TableHead className="col-span-1">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentRows.map((louvor) => (
							<TableRow key={louvor.id}>
								<TableCell className="col-span-1">{louvor.nameInstrument}</TableCell>
								<TableCell className="col-span-1">{louvor.categories}</TableCell>
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
												onClick={() => alert(`Editar ${louvor.nameInstrument}`)}
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