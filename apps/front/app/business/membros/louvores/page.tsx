'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import FormSchemaLouvores from "./formSchema";
import LouvoresHook from "./louvoresHook";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Louvores() {
	const { form } = FormSchemaLouvores()
	const { onSubmit, filteredData, inputFiltes, resetForm } = LouvoresHook()

	const sortedFilteredData = filteredData.sort((a: any, b: any) => {
		if (a.nomeLouvor < b.nomeLouvor) {
			return -1;
		}
		if (a.nomeLouvor > b.nomeLouvor) {
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

	console.log(form.getValues())

	return (
		<>
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Filtro de louvores</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form id="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{inputFiltes.map((input) => (
									<FormField
										key={input.type}
										control={form.control}
										name={input.type as "nomeLouvor" | "descricao" | "instrumento" | "categoria"}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{input.label}</FormLabel>
												<FormControl>
													<Input placeholder={input.placeholder} type={input.typeInput} {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
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
				<Table>
					<TableHeader className="bg-gray-100">
						<TableRow className="grid-cols-6">
							<TableHead className="col-span-1">Nome do Louvor</TableHead>
							<TableHead className="col-span-1">Descrição</TableHead>
							<TableHead className="col-span-1">Categoria</TableHead>
							<TableHead className="col-span-1">Instrumento</TableHead>
							<TableHead className="col-span-1">PDF</TableHead>
							<TableHead className="col-span-1">MP3</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentRows.map((louvor) => (
							<TableRow key={louvor.id}>
								<TableCell className="col-span-1">{louvor.nomeLouvor}</TableCell>
								<TableCell className="col-span-1">{louvor.descricao}</TableCell>
								<TableCell className="col-span-1">{louvor.categoria}</TableCell>
								<TableCell className="col-span-1">{louvor.instrumento}</TableCell>
								<TableCell className="col-span-1">
									<a href={louvor.pdf} target="_blank" rel="noopener noreferrer">
										PDF
									</a>
								</TableCell>
								<TableCell className="col-span-1">
									<a href={louvor.mp3} target="_blank" rel="noopener noreferrer">
										MP3
									</a>
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