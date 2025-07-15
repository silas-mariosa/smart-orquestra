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
import { useState } from "react";
import FormSchemaLouvores from "./formSchema";
import LouvoresHook from "./louvoresHook";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Louvores() {
	const {
		onSubmit,
		filteredData,
		resetForm,
		louvoresIsLoading,
		instrumentOptions,
		instrumentosIsLoading
	} = LouvoresHook()

	const { form } = FormSchemaLouvores()

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

	const totalPages = Math.ceil(sortedFilteredData.length / rowsPerPage);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	if (louvoresIsLoading || instrumentosIsLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="flex items-center gap-2">
					<Loader2 className="h-6 w-6 animate-spin" />
					<span>Carregando louvores...</span>
				</div>
			</div>
		);
	}

	return (
		<>
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Filtro de louvores</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form id="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
													{instrumentOptions.map((instrumento: string) => (
														<option key={instrumento} value={instrumento}>
															{instrumento}
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
								<Button type="button" onClick={() => {
									form.reset({
										nomeLouvor: "",
										descricao: "",
										instrument: ""
									});
									resetForm()
								}}>Limpar</Button>
								<Button onClick={() => setCurrentPage(1)} type="submit">Filtrar</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card className="p-2 mx-4 rounded-sm mt-4">
				<Table>
					<TableHeader className="bg-gray-100">
						<TableRow className="grid-cols-5">
							<TableHead className="col-span-1">Nome do Louvor</TableHead>
							<TableHead className="col-span-1">Descrição</TableHead>
							<TableHead className="col-span-1">Instrumento</TableHead>
							<TableHead className="col-span-1">PDF</TableHead>
							<TableHead className="col-span-1">MP3</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentRows.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center py-8 text-gray-500">
									Nenhum louvor encontrado
								</TableCell>
							</TableRow>
						) : (
							currentRows.map((louvor) => (
								<TableRow key={louvor.id}>
									<TableCell className="col-span-1">{louvor.nameLouvor}</TableCell>
									<TableCell className="col-span-1">{louvor.description}</TableCell>
									<TableCell className="col-span-1">{louvor.instrumentos}</TableCell>
									<TableCell className="col-span-1">
										{louvor.pdf ? (
											<a
												href={louvor.pdf}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:text-blue-800 underline"
											>
												PDF
											</a>
										) : (
											<span className="text-gray-400">-</span>
										)}
									</TableCell>
									<TableCell className="col-span-1">
										{louvor.mp3 ? (
											<a
												href={louvor.mp3}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:text-blue-800 underline"
											>
												MP3
											</a>
										) : (
											<span className="text-gray-400">-</span>
										)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
				{totalPages > 1 && (
					<div className="flex justify-center items-center mt-4">
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
					</div>
				)}
			</Card>
		</>
	);
}