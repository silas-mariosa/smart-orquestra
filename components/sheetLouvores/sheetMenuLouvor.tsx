'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useState } from "react"
import FormSchemaAddLouvores from "../sheetInstrumento/formSchema"
import LouvoresAPIs, { CreateLouvorType } from "@/hooks/louvoresHooks/louvoresHooks"
import InstrumentosAPIs from "@/hooks/instrumentosHooks/instrumentosHooks"
import { Loader2 } from "lucide-react"

interface SheetModelProps {
	titulo: string
	subtitulo: string
	categories: string[]
}

export function SheetLouvor({ titulo, subtitulo, categories }: SheetModelProps) {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const { form } = FormSchemaAddLouvores()
	const { mutatePostLouvor, postPending } = LouvoresAPIs()
	const { instrumentos, instrumentosIsLoading } = InstrumentosAPIs()

	// Extrair nomes únicos dos instrumentos para o select
	const instrumentOptions = Array.from(new Set(
		instrumentos?.map(instrument => instrument.nameInstrument) || []
	)).sort();

	const onSubmit = (data: any) => {
		const louvorData: CreateLouvorType = {
			nameLouvor: data.nomeLouvor,
			description: data.descricao,
			pdf: data.pdf || "",
			mp3: data.mp3 || "",
			instrumentos: data.instrument || "",
		}

		mutatePostLouvor(louvorData, {
			onSuccess: () => {
				setIsSheetOpen(false)
				form.reset()
			}
		})
	}

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
										<FormLabel>{"Nome do Louvor"}</FormLabel>
										<FormControl>
											<Input placeholder={"Digite o nome do louvor"} type={"text"} {...field} />
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
											<select {...field} className="border p-2 rounded-md w-full" disabled={instrumentosIsLoading}>
												<option value="">
													{instrumentosIsLoading ? "Carregando instrumentos..." : "Selecione um instrumento"}
												</option>
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
							<Button disabled={postPending || instrumentosIsLoading} type="submit">
								{postPending ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
										Criando...
									</>
								) : (
									"Adicionar louvor"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
