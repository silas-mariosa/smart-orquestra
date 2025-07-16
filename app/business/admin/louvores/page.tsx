'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useState, useEffect } from "react";
import FormSchemaLouvores from "./formSchema";
import LouvoresHook from "./louvoresHook";
import { ChevronLeft, ChevronRight, Loader2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SheetLouvor } from "@/components/sheetLouvores/sheetMenuLouvor";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LouvoresAPIs from "@/hooks/louvoresHooks/louvoresHooks";
import CategoriesHooks from "@/hooks/categoriesHooks/categoriesHooks";
import { CategoriesType } from "../instrumentos/IInstrumentosDTO";

export default function Louvores() {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [louvorToDelete, setLouvorToDelete] = useState<{ id: string, name: string } | null>(null);

	// Hook para buscar categorias reais
	const { categories } = CategoriesHooks();
	const [categoriaOptions, setCategoriaOptions] = useState<CategoriesType[]>([]);

	// Atualiza categoriaOptions quando categories mudar
	useEffect(() => {
		if (categories) {
			setCategoriaOptions(categories);
		}
	}, [categories]);

	const { form } = FormSchemaLouvores()
	const { onSubmit, filteredData, resetForm, louvoresIsLoading, louvoresError, instrumentOptions, instrumentosIsLoading } = LouvoresHook()
	const { mutateDeleteLouvor, deletePending } = LouvoresAPIs()

	const handleSubmit = (data: any) => {
		console.log("Page form data:", data);
		try {
			onSubmit(data);
		} catch (error) {
			console.error("Erro no submit:", error);
		}
	}

	const sortedFilteredData = filteredData.sort((a: any, b: any) => {
		if (a.nameLouvor < b.nameLouvor) {
			return -1;
		}
		if (a.nameLouvor > b.nameLouvor) {
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

	console.log(currentRows)

	const totalPages = Math.ceil(sortedFilteredData.length / rowsPerPage);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	// Loading state
	if (louvoresIsLoading || instrumentosIsLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="h-8 w-8 animate-spin" />
				<span className="ml-2">Carregando louvores...</span>
			</div>
		);
	}

	// Error state
	if (louvoresError) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<p className="text-red-600 mb-2">Erro ao carregar louvores</p>
					<Button onClick={() => window.location.reload()}>Tentar novamente</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full max-w-6xl mx-auto mt-8 p-4 md:p-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary text-center font-sans">Louvores</h1>
			<Card className="p-6 md:p-8 mb-8 rounded-2xl shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl text-primary font-semibold mb-2">Filtro de louvores</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form id="form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								<FormField
									control={form.control}
									name={"nomeLouvor"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{"Louvores"}</FormLabel>
											<FormControl>
												<Input placeholder={"Preencha o nome do louvor"} type={"text"} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={"descricao"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{"Descrição"}</FormLabel>
											<FormControl>
												<Input placeholder={"Preencha a descrição"} type={"text"} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={"instrument"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Instrumento</FormLabel>
											<FormControl>
												<select {...field} className="border p-2 rounded-md w-full">
													<option value="">Selecione um instrumento</option>
													{instrumentOptions.map((option) => (
														<option key={option} value={option}>
															{option}
														</option>
													))}
												</select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={"categoria"}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Categoria</FormLabel>
											<FormControl>
												<select {...field} className="border p-2 rounded-md w-full">
													<option value="">Selecione uma categoria</option>
													{categoriaOptions.map((option: any) => (
														<option key={option.id} value={option.name}>
															{option.name}
														</option>
													))}
												</select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex justify-end gap-6">
								<Button type="button" onClick={() => { form.reset(); resetForm() }}>Limpar</Button>
								<Button onClick={() => setCurrentPage(1)} type="submit">Filtrar</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card className="p-6 md:p-8 rounded-2xl shadow-lg">
				<div className="flex justify-end items-center mb-4">
					<SheetLouvor categories={categoriaOptions.map((c: any) => c.name)} titulo="Louvores" subtitulo="Louvores" />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nome do Louvor</TableHead>
							<TableHead>Descrição</TableHead>
							<TableHead>Instrumento</TableHead>
							<TableHead>PDF</TableHead>
							<TableHead>MP3</TableHead>
							<TableHead>Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentRows.map((louvor) => (
							<TableRow key={louvor.id} className="even:bg-muted/60 hover:bg-accent/10 transition-colors">
								<TableCell>{louvor.nameLouvor}</TableCell>
								<TableCell>{louvor.description}</TableCell>
								<TableCell>{louvor.instrumentos || ""}</TableCell>
								<TableCell>
									{louvor.pdf ? (
										<a href={louvor.pdf} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PDF</a>
									) : (
										<span className="text-muted-foreground">N/A</span>
									)}
								</TableCell>
								<TableCell>
									{louvor.mp3 ? (
										<a href={louvor.mp3} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MP3</a>
									) : (
										<span className="text-muted-foreground">N/A</span>
									)}
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<span className="sr-only">Open menu</span>
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem onClick={() => alert(`Editar ${louvor.nameLouvor}`)}>
												Detalhes
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => {
													if (!louvor.id || !louvor.nameLouvor) return;
													setLouvorToDelete({ id: louvor.id, name: louvor.nameLouvor });
													setDeleteDialogOpen(true);
												}}
												className="text-error"
											>
												Deletar
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{/* Dialog de confirmação de exclusão */}
				<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirmar exclusão</DialogTitle>
							<DialogDescription>
								Tem certeza que deseja deletar <strong>{louvorToDelete?.name}</strong>? Essa ação não pode ser desfeita.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								disabled={deletePending}
								variant="outline"
								onClick={() => {
									setDeleteDialogOpen(false);
									setLouvorToDelete(null);
								}}
							>
								Cancelar
							</Button>
							<Button
								disabled={deletePending}
								variant="destructive"
								onClick={() => {
									if (louvorToDelete?.id) {
										mutateDeleteLouvor(louvorToDelete.id);
									}
									setDeleteDialogOpen(false);
									setLouvorToDelete(null);
								}}
							>
								{deletePending ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Deletar"
								)}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
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
		</div>
	);
}