'use client'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useState } from "react"
import FormSchemaSheetInstrumentos from "../sheetLouvores/formSchema"
import { CategoriesType } from "@/app/business/admin/instrumentos/IInstrumentosDTO"

interface SheetModelProps {
	titulo: string
	subtitulo: string
	categories: CategoriesType[]
}

const onSubmit = (data: any) => console.log(data)

export function SheetModel({ titulo, subtitulo, categories }: SheetModelProps) {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const { form } = FormSchemaSheetInstrumentos()
	return (
		<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
			<SheetTrigger asChild>
				<Button variant="outline">Adicionar</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{titulo}</SheetTitle>
					<SheetDescription>
						{subtitulo}
					</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form id="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="flex flex-col gap-4">
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
								name={"categoria"}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Categoria</FormLabel>
										<FormControl>
											<select {...field} className="border p-2 rounded-md w-full">
												<option value="">Selecione uma categoria</option>
												{categories.map((option) => (
													<option key={option.id} value={option.id}>
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
						<div className="flex justify-center items-center mt-8">
							<Button onClick={() => {
							}
							} type="submit">Criar instrumento</Button>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
