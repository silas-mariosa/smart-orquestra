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
import FormSchemaAddLouvores from "../sheetInstrumento/formSchema"

interface SheetModelProps {
	titulo: string
	subtitulo: string
	categories: string[]
	instrumentos: string[]
}

const onSubmit = (data: any) => console.log(data)

export function SheetLouvor({ titulo, subtitulo, categories, instrumentos }: SheetModelProps) {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const { form } = FormSchemaAddLouvores(categories, instrumentos)
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
								name={"nomeLouvor"}
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
								name={"descricao"}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Descrição"}</FormLabel>
										<FormControl>
											<Input placeholder={"Adicione uma descrição"} type={"text"} {...field} />
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
												{categories.map((option) => (
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
												{categories.map((option) => (
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
								name={"pdf"}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Link do PDF"}</FormLabel>
										<FormControl>
											<Input placeholder={"Digite o link"} type={"text"} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={"mp3"}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Link do MP3"}</FormLabel>
										<FormControl>
											<Input placeholder={"Digite o link"} type={"text"} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-center items-center mt-8">
							<Button onClick={() => {
							}
							} type="submit">Adicionar louvor</Button>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
