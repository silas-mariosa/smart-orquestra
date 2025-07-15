import { toast } from "@/components/ui/use-toast";
import { apiUrl } from "@/config/url";
import { useCookie } from "@/context/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface LouvorType {
  id: string;
  nameLouvor: string;
  description: string;
  pdf: string;
  mp3: string;
  instrumentos: string;
  instrumentoName: string;
  instrumentoCategories: string;
  instrumentoTipo: string;
  orchestraId: string;
}

export interface CreateLouvorType {
  nameLouvor: string;
  description: string;
  pdf: string;
  mp3: string;
  instrumentos: string;
}

export interface UpdateLouvorType extends CreateLouvorType {
  id: string;
}

export default function LouvoresAPIs() {
  const { getCookie } = useCookie();
  const token = getCookie("authTokenSmart");

  // Fetch louvores
  const fetchLouvores = async () => {
    const response = await fetch(`${apiUrl}louvores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao obter louvores");
    }

    const data: LouvorType[] = await response.json();
    return Array.isArray(data) ? data : [];
  };

  const {
    data: louvores,
    isLoading: louvoresIsLoading,
    error: louvoresError,
    refetch: refetchLouvores,
  } = useQuery({
    queryKey: ["louvores"],
    queryFn: fetchLouvores,
  });

  // Create louvor
  const postLouvor = async (data: CreateLouvorType) => {
    const response = await fetch(`${apiUrl}louvores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao criar louvor");
    }

    const dataLouvor: LouvorType = await response.json();
    return dataLouvor;
  };

  const {
    mutate: mutatePostLouvor,
    isPending: postPending,
    isSuccess: postSuccess,
  } = useMutation({
    mutationFn: postLouvor,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Louvor criado com sucesso!",
      });
      refetchLouvores();
    },
    onError: (error) => {
      toast({
        title: "Erro!",
        description: "Erro ao criar louvor: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Update louvor
  const updateLouvor = async (data: UpdateLouvorType) => {
    const response = await fetch(`${apiUrl}louvores/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao atualizar louvor");
    }

    const dataLouvor: LouvorType = await response.json();
    return dataLouvor;
  };

  const {
    mutate: mutateUpdateLouvor,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useMutation({
    mutationFn: updateLouvor,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Louvor atualizado com sucesso!",
      });
      refetchLouvores();
    },
    onError: (error) => {
      toast({
        title: "Erro!",
        description: "Erro ao atualizar louvor: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Delete louvor
  const deleteLouvor = async (id: string) => {
    const response = await fetch(`${apiUrl}louvores/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao deletar louvor");
    }
  };

  const {
    mutate: mutateDeleteLouvor,
    isPending: deletePending,
  } = useMutation({
    mutationFn: deleteLouvor,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Louvor deletado com sucesso!",
      });
      refetchLouvores();
    },
    onError: (error) => {
      toast({
        title: "Erro!",
        description: "Erro ao deletar louvor: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Get louvor by ID
  const getLouvorById = async (id: string) => {
    const response = await fetch(`${apiUrl}louvores/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao obter louvor");
    }

    const data: LouvorType = await response.json();
    return data;
  };

  return {
    // Data
    louvores,
    louvoresIsLoading,
    louvoresError,
    refetchLouvores,

    // Create
    mutatePostLouvor,
    postPending,
    postSuccess,

    // Update
    mutateUpdateLouvor,
    updatePending,
    updateSuccess,

    // Delete
    mutateDeleteLouvor,
    deletePending,

    // Get by ID
    getLouvorById,
  };
} 