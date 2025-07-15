"use client";

import { apiUrl } from "@/config/url";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "../use-toast";
import { useCookie } from "@/context/useAuth";

const formSchema = z.object({
  email: z.string().email({
    message: "Prencha o campo de email",
  }),
  senha: z.string().min(1, {
    message: "Prencha o campo de senha",
  }),
});

export default function useLogin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { setCookie } = useCookie();

  const onSubmit = async (formRes: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRes),
      });
      const responseText = await response.text();

      if (response.ok) {
        const data = JSON.parse(responseText);
        setCookie("authTokenSmart", data.token);
        push("/business/membros/");
      } else {
        toast({
          title: "Erro ao fazer login",
          description: responseText,
          duration: 1000,
        });
        setIsLoading(false);
      }
    } catch (error: Error | any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        duration: 1000,
      });
      setIsLoading(false);
    }
  };

  return {
    formSchema,
    onSubmit,
    isLoading,
  };
}
