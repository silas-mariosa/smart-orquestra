import { apiUrl } from "@/config/url";
import { Perfil } from "./perfilTypes";
import { useQuery, useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { toast } from "@/components/ui/use-toast";

export interface InstrumentoPessoal {
    id?: string;
    instrumentId: string;
    owner: string;
    position: string;
    serie: string;
    brand: string;
    model: string;
    orchestraId?: string;
}

export interface CreateInstrumentoPessoal {
    instrumentId: string;
    owner: string;
    position: string;
    serie: string;
    brand: string;
    model: string;
}

export default function PerfilHook() {
    const cookies = new Cookies();
    const token = cookies.get("authTokenSmart");

    const getPerfil = async () => {
        const response = await fetch(`${apiUrl}usuario/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data: Perfil = await response.json();
        if (!response.ok) {
            throw new Error(response.statusText ?? "Erro ao obter perfil");
        }

        return Array.isArray(data) ? data[0] : data;
    }

    const {
        data: Perfil,
        error: PerfilError,
        isLoading: PerfilIsLoading,
        refetch: refetchPerfil
    } = useQuery({
        queryKey: ["perfil"],
        queryFn: getPerfil,
    });

    // Buscar instrumentos pessoais do usuário
    const getInstrumentosPessoais = async () => {
        const response = await fetch(`${apiUrl}instrumentos-lista/by-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText ?? "Erro ao obter instrumentos pessoais");
        }

        const data: InstrumentoPessoal[] = await response.json();
        return Array.isArray(data) ? data : [];
    };

    const {
        data: instrumentosPessoais,
        error: instrumentosPessoaisError,
        isLoading: instrumentosPessoaisIsLoading,
        refetch: refetchInstrumentosPessoais
    } = useQuery({
        queryKey: ["instrumentos-pessoais"],
        queryFn: getInstrumentosPessoais,
    });

    // Buscar instrumentos disponíveis
    const getInstrumentos = async () => {
        const response = await fetch(`${apiUrl}instrumentos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText ?? "Erro ao obter instrumentos");
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    };

    const {
        data: instrumentos,
        error: instrumentosError,
        isLoading: instrumentosIsLoading,
    } = useQuery({
        queryKey: ["instrumentos"],
        queryFn: getInstrumentos,
    });

    const postPerfil = async (data: any) => {
        const response = await fetch(`${apiUrl}usuario/update-usuario`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(response.statusText ?? "Erro ao atualizar perfil");
        }
        return response;
    }

    // Criar instrumento pessoal
    const postInstrumentoPessoal = async (data: CreateInstrumentoPessoal) => {
        const response = await fetch(`${apiUrl}instrumentos-lista`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText ?? "Erro ao criar instrumento pessoal");
        }

        const dataInstrumento: InstrumentoPessoal = await response.json();
        return dataInstrumento;
    };

    const {
        mutate: mutatePostInstrumentoPessoal,
        isPending: postInstrumentoPessoalPending,
        isSuccess: postInstrumentoPessoalSuccess,
    } = useMutation({
        mutationFn: postInstrumentoPessoal,
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                description: "Instrumento pessoal adicionado com sucesso!",
            });
            refetchInstrumentosPessoais();
        },
        onError: (error) => {
            toast({
                title: "Erro!",
                description: "Erro ao adicionar instrumento pessoal: " + error.message,
                variant: "destructive",
            });
        },
    });

    // Deletar instrumento pessoal
    const deleteInstrumentoPessoal = async (id: string) => {
        const response = await fetch(`${apiUrl}instrumentos-lista/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText ?? "Erro ao deletar instrumento pessoal");
        }
    };

    const {
        mutate: mutateDeleteInstrumentoPessoal,
        isPending: deleteInstrumentoPessoalPending,
    } = useMutation({
        mutationFn: deleteInstrumentoPessoal,
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                description: "Instrumento pessoal removido com sucesso!",
            });
            refetchInstrumentosPessoais();
        },
        onError: (error) => {
            toast({
                title: "Erro!",
                description: "Erro ao remover instrumento pessoal: " + error.message,
                variant: "destructive",
            });
        },
    });

    return {
        postPerfil,
        Perfil,
        PerfilError,
        PerfilIsLoading,
        refetchPerfil,
        instrumentosPessoais,
        instrumentosPessoaisError,
        instrumentosPessoaisIsLoading,
        refetchInstrumentosPessoais,
        instrumentos,
        instrumentosError,
        instrumentosIsLoading,
        mutatePostInstrumentoPessoal,
        postInstrumentoPessoalPending,
        postInstrumentoPessoalSuccess,
        mutateDeleteInstrumentoPessoal,
        deleteInstrumentoPessoalPending,
    }
}