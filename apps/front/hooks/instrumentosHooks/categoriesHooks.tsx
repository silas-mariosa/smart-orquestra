import { CategoriesType } from "@/app/business/admin/instrumentos/IInstrumentosDTO";
import { apiUrl } from "@/config/url";
import { useCookie } from "@/context/useAuth";
import { useQuery } from "@tanstack/react-query";

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
    deleteCategory
  };
}