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
    email: z.string().email({
        "message": "Prencha o campo de email"
    }),
    password: z.string().min(1, {
        "message": "Prencha o campo de senha"
    }),
})
export default function Login() {
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        push("/business/membros")
        console.log(values)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#1f5b82]">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle>
                        Bem vindo ao Smart Orquestra
                    </CardTitle>
                    <CardDescription>
                        Faça login para continuar, caso ainda não tenha uma conta, clique em criar uma conta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-sm font-semibold">Sua senha</FormLabel>
                                            <Button onClick={() => push("/business/login/forgot-password")} variant="link" className="text-xs text-blue-500">Esqueceu sua senha?</Button>
                                        </div>
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
                            <div className="flex justify-center pt-6">
                                <Button className="w-full max-w-sm" type="submit">Logar</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center text-muted-foreground text-xs">
                    Ainda não tem uma conta?
                    <Button onClick={() => push("/business/login/signup")} variant="link" className="ml-2 p-0 text-xs text-accent-foreground">Criar uma conta</Button>
                </CardFooter>
            </Card>
        </div>
    );
}