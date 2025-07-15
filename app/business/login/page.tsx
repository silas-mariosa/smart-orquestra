"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useRouter } from "next/navigation"
import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import useLogin from "@/hooks/loginHooks/useLogin";


export default function Login() {
	const { push } = useRouter()
	const { isLoading, formSchema, onSubmit } = useLogin()
	const [isShowPassword, setIsShowPassword] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			senha: "",
		},
	})

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
			<Card className="w-full max-w-md rounded-2xl shadow-2xl p-0">
				<CardHeader className="text-center pb-0">
					<CardTitle className="text-2xl md:text-3xl font-bold text-primary font-sans mb-2">Bem-vindo ao Smart Orquestra</CardTitle>
					<CardDescription className="text-base text-muted-foreground mb-2">
						Faça login para continuar. Caso ainda não tenha uma conta, clique em criar uma conta.
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-0">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-semibold">E-mail</FormLabel>
										<FormControl>
											<Input placeholder="seu@email.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="senha"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-semibold">Sua senha</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={isShowPassword ? "text" : "password"}
													placeholder="Digite sua senha..."
													{...field}
												/>
												<Button
													tabIndex={-1}
													type="button"
													variant="ghost"
													className="absolute inset-y-0 right-0 flex items-center pr-3"
													onClick={() => setIsShowPassword(!isShowPassword)}
												>
													<Eye className="w-5 h-5 text-gray-400" />
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end">
								<Button
									type="button"
									onClick={() => push("/business/login/forgot-password")}
									variant="link"
									className="text-xs text-primary p-0 h-auto"
								>
									Esqueceu sua senha?
								</Button>
							</div>
							<Button disabled={isLoading} className="w-full h-12 text-base font-semibold mt-2" type="submit">
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{isLoading ? "Carregando..." : "Entrar"}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col items-center gap-2 text-muted-foreground text-xs bg-transparent border-none mt-2">
					<span>Ainda não tem uma conta?</span>
					<Button onClick={() => push("/business/login/signup")} variant="link" className="p-0 text-primary text-sm font-semibold">Criar uma conta</Button>
				</CardFooter>
			</Card>
		</div>
	);
}