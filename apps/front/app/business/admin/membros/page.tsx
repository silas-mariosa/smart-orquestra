'use client'

import { useState } from "react";
import FormSchemaMembros from "./formSchema";
import MembrosHook from "./membrosHook";
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
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";


const instrumentOptions = [
    "Violão",
    "Piano",
    "Bateria",
    "Guitarra",
    "Baixo",
    "Saxofone - Tenor",
    "Saxofone - Barítono",
    "Saxofone - Alto",
    "Flauta",
    "Teclado"
]

const positions = [
    "Primeiro",
    "Segundo",
    "Terceiro",
]

export default function Membros() {
    const { form } = FormSchemaMembros(instrumentOptions, positions)
    const { onSubmit, filteredData, resetForm } = MembrosHook()

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
                    <CardTitle>Filtro de membros</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name={"nome"}
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
                                    name={"bairro"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{"Bairro"}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Buscar membro por bairro"} type={"text"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"position"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Posição</FormLabel>
                                            <FormControl>
                                                <select {...field} className="border p-2 rounded-md w-full">
                                                    <option value="">Selecione uma posição</option>
                                                    {positions.map((option) => (
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
                                    name={"actived"}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                            <FormLabel className="font-bold">{"Ativo?"}</FormLabel>
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
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
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="grid-cols-6">
                            <TableHead className="col-span-1">Nome do membro</TableHead>
                            <TableHead className="col-span-1">Posição</TableHead>
                            <TableHead className="col-span-1">Instrumento</TableHead>
                            <TableHead className="col-span-1">Data de nascimento</TableHead>
                            <TableHead className="col-span-1">Bairro</TableHead>
                            <TableHead className="col-span-1">Ativo?</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentRows.map((louvor) => (
                            <TableRow key={louvor.id}>
                                <TableCell className="col-span-1">{louvor.nome}</TableCell>
                                <TableCell className="col-span-1">{louvor.position}</TableCell>
                                <TableCell className="col-span-1">{louvor.instrument}</TableCell>
                                <TableCell className="col-span-1">{louvor.birthdate}</TableCell>
                                <TableCell className="col-span-1">{louvor.bairro}</TableCell>
                                <TableCell className="col-span-1">{louvor.actived ? "Sim" : "Nao"}</TableCell>
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