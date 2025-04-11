import { InstrumentosType } from "@/app/business/admin/instrumentos/IInstrumentosDTO";
import { apiUrl } from "@/config/url";
import { useCookie } from "@/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function InstrumentosHooks() {
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

  return {
    instrumentos,
    instrumentosIsLoading,
    instrumentosError,
    refetchInstrumentos
  }
}