"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { inputs } from "./buttonsPerfil"
import FormSchemaPerfil from "./formSchemas"
import { useFieldArray } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"

const instrumentOptions = [
	"Violão",
	"Piano",
	"Bateria",
	"Guitarra",
	"Baixo",
	"Saxofone",
	"Flauta",
	"Teclado"
]

export default function ProfileForm() {
	const { formPerfil, formSchemaPerfil, instrumentForm, instrumentSchema } = FormSchemaPerfil()

	function onSubmit(values: z.infer<typeof formSchemaPerfil>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	const { fields, append, remove } = useFieldArray({
		control: instrumentForm.control,
		name: "instruments",
	})

	const onSubmitInstrumentInfo = (values: z.infer<typeof instrumentSchema>) => {
		// Handle instrument info submission
		console.log("Instrument Info:", values)
	}

	return (
		<div className="space-y-8">
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Perfil</CardTitle>
				</CardHeader>
				<CardDescription className="ml-4">
					Altere seus dados pessoais aqui.
				</CardDescription>
				<CardContent>
					<Form {...formPerfil}>
						<form onSubmit={formPerfil.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
								{inputs.map((input, index) => (
									<FormField
										key={index}
										control={formPerfil.control}
										name={input.type as "username" | "birthday" | "cep" | "street" | "number" | "neiborhood" | "city" | "complement" | "whatsapp"}
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
							<div className="flex justify-end">
								<Button type="submit">Alterar</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Instrumentos</CardTitle>
				</CardHeader>
				<CardDescription className="ml-4">
					Adicione os instrumentos que você toca e forneça as informações necessárias.
				</CardDescription>
				<CardContent>
					<Form {...instrumentForm}>
						<form onSubmit={instrumentForm.handleSubmit(onSubmitInstrumentInfo)} className="space-y-8">
							{/* Se não houver instrumentos, mostramos a opção para adicionar */}
							{fields.length === 0 ? (
								<div className="text-center">
									<p>Adicione um instrumento abaixo.</p>
								</div>
							) : (
								<div className="space-y-4">
									{fields.map((item, index) => (
										<div key={item.id} className="border p-4 rounded-md space-y-4">
											{/* Aplicando o grid para organizar os campos */}
											<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.instrument`}
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
													control={instrumentForm.control}
													name={`instruments.${index}.serial`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Serial</FormLabel>
															<FormControl>
																<Input placeholder="Número de série" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.position`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Posição</FormLabel>
															<FormControl>
																<Input placeholder="Posição do instrumento" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.brand`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Marca</FormLabel>
															<FormControl>
																<Input placeholder="Marca do instrumento" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.model`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Modelo</FormLabel>
															<FormControl>
																<Input placeholder="Modelo do instrumento" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.isOwn`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>É seu?</FormLabel>
															<FormControl>
																<Checkbox {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											{/* Botão para remover o instrumento */}
											<Button
												type="button"
												onClick={() => remove(index)}
												variant="destructive"
											>
												Remover Instrumento
											</Button>
										</div>
									))}
								</div>
							)}
							<div className="flex justify-end space-x-4">
								<Button
									type="button"
									onClick={() =>
										append({
											instrument: "",
											isOwn: false,
											serial: "",
											position: "",
											brand: "",
											model: "",
										})
									}
								>
									Adicionar Outro Instrumento
								</Button>

								{/* Botão para enviar o formulário */}
								<Button type="submit">Salvar Instrumentos</Button>
							</div>
							{/* Botão para adicionar mais instrumentos */}
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
