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
import { Eye } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, {
        "message": "Prencha o campo de nome"
    }),
    email: z.string().email({
        "message": "Prencha o campo de email"
    }),
    password: z.object({
        password: z.string().min(1, {
            "message": "Prencha o campo de senha"
        }),
        passwordConfirmation: z.string().min(1, {
            "message": "Prencha o campo de senha"
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "As senhas não conferem",
        path: ["passwordConfirmation"],
    }),
    orquestra: z.string().min(1, {
        "message": "Prencha o campo de orquestra"
    }),
})
export default function SignUp() {
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: {
                password: "",
                passwordConfirmation: ""
            },
            orquestra: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        push("/business/login")
        console.log(values)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#1f5b82]">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle>
                        Vamos criar sua conta
                    </CardTitle>
                    <CardDescription>
                        Preencha os campos abaixo para criar sua conta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Nome Completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex.: João da Silva" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                name="password.password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Sua senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="absolute inset-y-0 right-0 items-center pl-3"
                                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                                >
                                                    <Eye className="w-5 h-5 text-gray-400" />
                                                </Button>
                                                <Input type={isShowPassword ? "text" : "password"} placeholder="digite sua senha..." {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password.passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Confirmar senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="absolute inset-y-0 right-0 items-center pl-3"
                                                    onClick={() => setIsShowPasswordConfirmation(!isShowPasswordConfirmation)}
                                                >
                                                    <Eye className="w-5 h-5 text-gray-400" />
                                                </Button>
                                                <Input type={isShowPasswordConfirmation ? "text" : "password"} placeholder="digite sua senha..." {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center pt-6">
                                <Button className="w-full max-w-sm" type="submit">Logar</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center text-muted-foreground text-xs">
                    Ainda não tem uma conta?
                    <Button variant="link" className="ml-2 p-0 text-xs text-accent-foreground">Criar uma conta</Button>
                </CardFooter>
            </Card>
        </div>
    );
}