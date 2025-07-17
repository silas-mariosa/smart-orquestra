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
import AddressFormFields from "@/components/addressForm"
import PerfilHook from "./perfilHook"
import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Trash2 } from "lucide-react"
import { useForm as useFormPassword } from "react-hook-form";
import { apiUrl } from "@/config/url"
import Cookies from "universal-cookie";

const positionOptions = [
	"Primeiro",
	"Segundo",
	"Terceiro",
]

export default function ProfileForm() {
	const [isLoading, setIsLoading] = useState(false)
	const { instrumentForm, instrumentSchema, formPerfil, formSchemaPerfil } = FormSchemaPerfil()
	const {
		Perfil,
		PerfilIsLoading,
		postPerfil,
		instrumentosPessoais,
		instrumentosPessoaisIsLoading,
		instrumentos,
		instrumentosIsLoading,
		mutatePostInstrumentoPessoal,
		postInstrumentoPessoalPending,
		mutateDeleteInstrumentoPessoal,
		deleteInstrumentoPessoalPending
	} = PerfilHook()

	// Extrair nomes únicos dos instrumentos para o select
	const instrumentOptions = useMemo(() => {
		return Array.from(new Set(
			instrumentos?.map((instrument: any) => ({
				id: instrument.id,
				name: instrument.nameInstrument
			})) || []
		)).sort((a, b) => a.name.localeCompare(b.name));
	}, [instrumentos]);

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
				whatsapp: Perfil?.user?.whatsapp ?? "",
			});
		}
	}, [Perfil]);

	const { fields, append, remove } = useFieldArray({
		control: instrumentForm.control,
		name: "instruments",
	})

	const onSubmitInstrumentInfo = (values: z.infer<typeof instrumentSchema>) => {
		console.log("Instrument Info:", values);

		// Salvar cada instrumento individualmente
		values.instruments?.forEach((instrument) => {
			mutatePostInstrumentoPessoal({
				instrumentId: instrument.instrumentId,
				owner: instrument.owner,
				position: instrument.position,
				serie: instrument.serie || "",
				brand: instrument.brand || "",
				model: instrument.model || "",
			});
		});

		// Limpar o formulário após salvar
		instrumentForm.reset({ instruments: [] });
	}

	const passwordSchema = z.object({
		password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
		confirmPassword: z.string()
	}).refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

	const passwordForm = useFormPassword<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { password: "", confirmPassword: "" },
	});
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const onSubmitPassword = async (values: z.infer<typeof passwordSchema>) => {
		setIsUpdatingPassword(true);
		try {
			const cookies = new Cookies();
			const token = cookies.get("authTokenSmart");
			const res = await fetch(`${apiUrl}usuario/update-password`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ newPassword: values.password }),
			});
			if (!res.ok) throw new Error("Erro ao atualizar senha 2");
			toast({ title: "Senha atualizada com sucesso!" });
			passwordForm.reset();
		} catch (error: any) {
			toast({ title: "Erro ao atualizar senha", description: error.message, variant: "destructive" });
		} finally {
			setIsUpdatingPassword(false);
		}
	};

	// Loading state para instrumentos
	if (PerfilIsLoading || instrumentosIsLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="h-8 w-8 animate-spin" />
				<span className="ml-2">Carregando perfil...</span>
			</div>
		);
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
								<Button disabled={isLoading} type="submit">
									{isLoading ? (
										<>
											<Loader2 className="h-4 w-4 animate-spin mr-2" />
											Salvando...
										</>
									) : (
										"Alterar"
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			{/* Seção de Instrumentos Pessoais Existentes */}
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Meus Instrumentos</CardTitle>
				</CardHeader>
				<CardDescription className="ml-4">
					Instrumentos que você possui.
				</CardDescription>
				<CardContent>
					{instrumentosPessoaisIsLoading ? (
						<div className="flex items-center justify-center h-32">
							<Loader2 className="h-6 w-6 animate-spin" />
							<span className="ml-2">Carregando instrumentos...</span>
						</div>
					) : instrumentosPessoais && instrumentosPessoais.length > 0 ? (
						<div className="space-y-4">
							{instrumentosPessoais.map((instrumento) => (
								<div key={instrumento.id} className="border p-4 rounded-md">
									<div className="flex justify-between items-start">
										<div className="flex-1">
											<h4 className="font-semibold">
												{instrumentOptions.find(opt => opt.id === instrumento.instrumentId)?.name || "Instrumento"}
											</h4>
											<p className="text-sm text-gray-600">
												Posição: {instrumento.position} |
												Proprietário: {instrumento.owner}
											</p>
											{instrumento.brand && (
												<p className="text-sm text-gray-600">
													Marca: {instrumento.brand}
													{instrumento.model && ` | Modelo: ${instrumento.model}`}
													{instrumento.serie && ` | Série: ${instrumento.serie}`}
												</p>
											)}
										</div>
										<Button
											type="button"
											variant="destructive"
											className="bg-red-500 hover:bg-red-600"
											size="sm"
											onClick={() => instrumento.id && mutateDeleteInstrumentoPessoal(instrumento.id)}
											disabled={deleteInstrumentoPessoalPending}
										>
											{deleteInstrumentoPessoalPending ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												<Trash2 className="h-4 w-4" />
											)}
										</Button>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center text-gray-500 py-8">
							<p>Você ainda não possui instrumentos cadastrados.</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Seção para Adicionar Novos Instrumentos */}
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Adicionar Instrumento</CardTitle>
				</CardHeader>
				<CardDescription className="ml-4">
					Adicione um novo instrumento que você possui.
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
											<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.instrumentId`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Instrumento</FormLabel>
															<FormControl>
																<select {...field} className="border p-2 rounded-md w-full">
																	<option value="">Selecione um instrumento</option>
																	{instrumentOptions.map((option) => (
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
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.position`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Posição</FormLabel>
															<FormControl>
																<select {...field} className="border p-2 rounded-md w-full">
																	<option value="">Selecione uma posição</option>
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
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.owner`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Proprietário</FormLabel>
															<FormControl>
																<Input placeholder="Seu nome" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.brand`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Marca</FormLabel>
															<FormControl>
																<Input placeholder="Ex: Fender, Yamaha" {...field} />
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
																<Input placeholder="Ex: Stratocaster" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={instrumentForm.control}
													name={`instruments.${index}.serie`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Série</FormLabel>
															<FormControl>
																<Input placeholder="Ex: 12345" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<Button
												type="button"
												onClick={() => remove(index)}
												variant="destructive"
												className="bg-red-500 hover:bg-red-600"
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
											instrumentId: "",
											owner: "",
											position: "Primeiro",
											serie: "",
											brand: "",
											model: "",
										})
									}
								>
									Adicionar Instrumento
								</Button>

								{fields.length > 0 && (
									<Button
										type="submit"
										disabled={postInstrumentoPessoalPending}
									>
										{postInstrumentoPessoalPending ? (
											<>
												<Loader2 className="h-4 w-4 animate-spin mr-2" />
												Salvando...
											</>
										) : (
											"Salvar Instrumentos"
										)}
									</Button>
								)}
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			{/* Seção de atualização de senha */}
			<Card className="p-2 mx-4 rounded-sm">
				<CardHeader>
					<CardTitle>Atualizar Senha</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...passwordForm}>
						<form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4 max-w-md">
							<FormField
								control={passwordForm.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nova senha</FormLabel>
										<FormControl>
											<Input type="password" placeholder="Digite a nova senha" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={passwordForm.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirme a nova senha</FormLabel>
										<FormControl>
											<Input type="password" placeholder="Confirme a nova senha" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end">
								<Button type="submit" disabled={isUpdatingPassword}>
									{isUpdatingPassword ? "Atualizando..." : "Atualizar Senha"}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
