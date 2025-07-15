import { CategoriesType } from "@/app/business/admin/instrumentos/IInstrumentosDTO";
import { apiUrl } from "@/config/url";
import { useCookie } from "@/context/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

export default function CategoriesHooks() {
  const { getCookie } = useCookie()
  const token = getCookie("authTokenSmart");

  const fetchCategories = async () => {
    const response = await fetch(`${apiUrl}categorias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: CategoriesType[] = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao obter categorias");
    }
    return Array.isArray(data) ? data : [];
  }

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
    refetch: refetchCategories
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Criar categoria
  const postCategory = async (data: { name: string }) => {
    const response = await fetch(`${apiUrl}categorias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao criar categoria");
    }

    const dataCategory: CategoriesType = await response.json();
    return dataCategory;
  };

  const {
    mutate: mutatePostCategory,
    isPending: postPending,
    isSuccess: postSuccess,
  } = useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Categoria criada com sucesso!",
      });
      refetchCategories();
    },
    onError: (error) => {
      toast({
        title: "Erro!",
        description: "Erro ao criar categoria: " + error.message,
        variant: "destructive",
      });
    },
  });

  const deleteCategory = async (id: any) => {
    const response = await fetch(`${apiUrl}categorias/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText ?? "Erro ao deletar categoria");
    }
  }

  return {
    categories,
    categoriesIsLoading,
    categoriesError,
    refetchCategories,
    mutatePostCategory,
    postPending,
    postSuccess,
    deleteCategory
  };
}