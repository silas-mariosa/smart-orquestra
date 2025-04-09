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
import { useFieldArray, useForm } from "react-hook-form"
import AddressFormFields from "@/components/addressForm"
import PerfilHook from "./perfilHook"
import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"

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

const positionOptions = [
	"Primeiro",
	"Segundo",
	"Terceiro",
]

export default function ProfileForm() {
	const [isLoading, setIsLoading] = useState(false)
	const { instrumentForm, instrumentSchema, formPerfil, formSchemaPerfil } = FormSchemaPerfil(instrumentOptions)
	const { Perfil, PerfilError, PerfilIsLoading, refetchPerfil, postPerfil } = PerfilHook()

	const onSubmit = async (values: z.infer<typeof formSchemaPerfil>) => {
		setIsLoading(true);

		const data = {
			name: values.name,
			brithday: values.brithday,
			whatsapp: values.whatsapp.replace(/\D/g, ""),
			cep: values.cep,
			endereco: values.endereco,
			numero: values.numero,
			bairro: values.bairro,
			cidade: values.cidade,
			estado: values.estado,
			complemento: values.complemento,
		};

		try {
			const response = await postPerfil(data);
			if (response.ok) {
				toast({
					title: "Perfil atualizado com sucesso!",
					description: "Seus dados foram salvos corretamente.",
					duration: 3000,
				});
			} else {
				throw new Error(response.statusText ?? "Erro ao atualizar perfil");
			}
		} catch (error: any) {
			console.error(error);
			toast({
				title: "Erro ao atualizar perfil",
				description: error?.message ?? "Ocorreu um erro inesperado.",
				variant: "destructive",
				duration: 3000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (Perfil) {
			formPerfil.reset({
				name: Perfil?.user?.name ?? "",
				brithday: Perfil?.user?.brithday?.split("T")[0] ?? "",
				cep: Perfil?.address?.cep ?? "",
				endereco: Perfil?.address?.endereco ?? "",
				numero: Perfil?.address?.numero ?? "",
				bairro: Perfil?.address?.bairro ?? "",
				cidade: Perfil?.address?.cidade ?? "",
				estado: Perfil?.address?.estado ?? "",
				complemento: Perfil?.address?.complemento ?? "",
				whatsapp: Perfil?.user?.whatsapp ?? "", // se existir esse campo
			});
		}
	}, [Perfil]);

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
										name={input.type as "name" | "brithday" | "whatsapp"}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{input.label}</FormLabel>
												<FormControl>
													<Input
														placeholder={input.placeholder}
														type={input.typeInput}
														{...field}
														onChange={(e) => {
															let value = e.target.value;
															if (input.type === "whatsapp") {
																value = input.func(e.target.value);
															}
															field.onChange(value)
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
							</div>
							<AddressFormFields form={formPerfil} />
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
													name={`instruments.${index}.position`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Posição</FormLabel>
															<FormControl>
																<select {...field} className="border p-2 rounded-md w-full">
																	<option value="">Selecione um Posição</option>
																	{positionOptions.map((option) => (
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
											position: 'Primeiro'
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
