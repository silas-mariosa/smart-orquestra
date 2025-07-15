import { InstrumentosType } from "@/app/business/admin/instrumentos/IInstrumentosDTO";
import { toast } from "@/components/ui/use-toast";
import { apiUrl } from "@/config/url";
import { useCookie } from "@/context/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function InstrumentosAPIs() {
  const { getCookie } = useCookie()
  const token = getCookie("authTokenSmart");

  const fetchInstrumentos = async () => {
    const response = await fetch(`${apiUrl}instrumentos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: InstrumentosType = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao obter instrumentos");
    }
    return Array.isArray(data) ? data : [];
  }

  const {
    data: instrumentos,
    isLoading: instrumentosIsLoading,
    error: instrumentosError,
    refetch: refetchInstrumentos
  } = useQuery({
    queryKey: ["instrumentos"],
    queryFn: fetchInstrumentos,
  });

  // Buscar instrumentos por categoria
  const fetchInstrumentosByCategory = async (categoryId: string) => {
    const response = await fetch(`${apiUrl}instrumentos/category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao obter instrumentos por categoria");
    }

    const data: InstrumentosType[] = await response.json();
    return Array.isArray(data) ? data : [];
  };

  const postInstrumentos = async (data: InstrumentosType) => {
    const response = await fetch(`${apiUrl}instrumentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const dataInstrumentos: InstrumentosType = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao criar instrumento");
    }
    return dataInstrumentos;
  }

  const {
    mutate: mutatePostInstrumentos,
    isPending: postPending,
    isSuccess: postSuccess,
  } = useMutation({
    mutationFn: postInstrumentos,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Instrumento inserido com sucesso!",
      });
      refetchInstrumentos();
    },
    onError: (error) => {
      console.error("Erro ao criar instrumento:", error);
    }
  });

  const deleteInstrumentos = async (id: string) => {
    const response = await fetch(`${apiUrl}instrumentos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao deletar instrumento");
    }
  }

  const {
    mutate: mutateDeleteInstrumentos,
    isPending: deletePending,
  } = useMutation({
    mutationFn: deleteInstrumentos,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Instrumento deletado com sucesso!",
      });
      refetchInstrumentos();
    },
    onError: (error) => {
      console.error("Erro ao deletar instrumento:", error);
    }
  });

  return {
    instrumentos,
    instrumentosIsLoading,
    instrumentosError,
    refetchInstrumentos,
    fetchInstrumentosByCategory,
    mutatePostInstrumentos,
    postPending,
    postSuccess,
    mutateDeleteInstrumentos,
    deletePending
  }
}