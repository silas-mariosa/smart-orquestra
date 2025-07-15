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
import FormSchemaUsers from "@/app/business/admin/users/formSchema"

interface SheetModelProps {
	titulo: string
	subtitulo: string
}

const onSubmit = (data: any) => console.log(data)

export function SheetModel({ titulo, subtitulo }: SheetModelProps) {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const { form } = FormSchemaUsers()
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
								name={"name"}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Nome do usuário"}</FormLabel>
										<FormControl>
											<Input placeholder={"Digite o nome do usuário"} type={"text"} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={"email"}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Digite o e-mail"}</FormLabel>
										<FormControl>
											<Input placeholder={"seu@email.com"} type={"text"} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={"password"}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Digite o e-mail"}</FormLabel>
										<FormControl>
											<Input placeholder={"Crie uma senha"} type={"text"} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-center items-center mt-8">
							<Button onClick={() => {
							}
							} type="submit">Criar usuário</Button>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
