import { apiUrl } from "@/config/url";
import { Perfil } from "./perfilTypes";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";

export default function PerfilHook() {

    const getPerfil = async () => {
        const cookies = new Cookies();
        const token = cookies.get("authTokenSmart");
        const response = await fetch(`${apiUrl}usuario`, {
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

    const postPerfil = async (data: any) => {
        const cookies = new Cookies();
        const token = cookies.get("authTokenSmart");
        const response = await fetch(`${apiUrl}usuario/update-usuario`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(response.statusText ?? "Erro ao obter perfil");
        }
        return response;
    }

    return {
        postPerfil,
        Perfil,
        PerfilError,
        PerfilIsLoading,
        refetchPerfil
    }
}