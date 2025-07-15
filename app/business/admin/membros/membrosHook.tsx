import { useState } from "react";
import FormSchemaMembros from "./formSchema";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import Cookies from "universal-cookie";

const positions = [
    "Primeiro",
    "Segundo",
    "Terceiro",
]

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

const dataMembros = [
    {
        id: 1,
        nome: "Membro 1",
        position: "Primeiro",
        instrument: "Violão",
        birthdate: "1990-01-01",
        bairro: "Bairro 1",
        actived: true,
    },
    {
        id: 2,
        nome: "Membro 2",
        position: "Segundo",
        instrument: "Piano",
        birthdate: "1991-01-01",
        bairro: "Bairro 2",
        actived: true,
    },
    {
        id: 3,
        nome: "Membro 3",
        position: "Terceiro",
        instrument: "Bateria",
        birthdate: "1992-01-01",
        bairro: "Bairro 3",
        actived: true,
    },
]

interface CreateUserData {
    name: string;
    email: string;
    accessLevel: string;
}

interface ResetPasswordResponse {
    message: string;
    user: any;
    newPassword: string;
}

interface CreateUserResponse {
    message: string;
    user: any;
    password: string;
}

export default function MembrosHook() {
    const { formSchema } = FormSchemaMembros(positions, instrumentOptions)

    const initiation: z.infer<typeof formSchema> = {
        nome: "",
        position: undefined,
        instrument: undefined,
        bairro: "",
        actived: false,
    }
    const [values, setValues] = useState<z.infer<typeof formSchema>>(initiation)
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
    const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordResponse | null>(null);

    const filteredData = dataMembros.filter((item) => {
        return (
            (!values.nome || item.nome.toLowerCase().includes(values.nome.toLowerCase())) &&
            (values.position === "" || values.position === undefined || item.position.toLowerCase().includes(values.position.toLowerCase())) &&
            (values.instrument === "" || values.instrument === undefined || item.instrument.toLowerCase().includes(values.instrument.toLowerCase())) &&
            (!values.bairro || item.bairro.toLowerCase().includes(values.bairro.toLowerCase())) &&
            (values.actived === false || values.actived === true || item.actived === values.actived)
        );
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
        setValues({ ...data })
    }

    const resetForm = () => {
        setValues(initiation)
    }

    // Criar usuário com senha aleatória
    const createUserWithPassword = async (userData: CreateUserData) => {
        setIsCreatingUser(true);
        setGeneratedPassword(null);

        try {
            const cookies = new Cookies();
            const token = cookies.get("authTokenSmart");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/"}usuario/create-with-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao criar usuário");
            }

            const data: CreateUserResponse = await response.json();
            setGeneratedPassword(data.password);

            toast({
                title: "Sucesso!",
                description: "Usuário criado com sucesso! Senha gerada automaticamente.",
            });

            return data;
        } catch (error: any) {
            toast({
                title: "Erro!",
                description: error.message || "Erro ao criar usuário",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsCreatingUser(false);
        }
    };

    // Redefinir senha de usuário
    const resetUserPassword = async (userId: string) => {
        setIsResettingPassword(true);
        setResetPasswordData(null);

        try {
            const cookies = new Cookies();
            const token = cookies.get("authTokenSmart");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/"}usuario/${userId}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao redefinir senha");
            }

            const data: ResetPasswordResponse = await response.json();
            setResetPasswordData(data);

            toast({
                title: "Sucesso!",
                description: "Senha redefinida com sucesso! Nova senha gerada.",
            });

            return data;
        } catch (error: any) {
            toast({
                title: "Erro!",
                description: error.message || "Erro ao redefinir senha",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsResettingPassword(false);
        }
    };

    // Limpar dados de senha
    const clearPasswordData = () => {
        setGeneratedPassword(null);
        setResetPasswordData(null);
    };

    return {
        filteredData,
        onSubmit,
        resetForm,
        createUserWithPassword,
        resetUserPassword,
        isCreatingUser,
        isResettingPassword,
        generatedPassword,
        resetPasswordData,
        clearPasswordData
    }
}