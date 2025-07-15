"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaPerfil() {
  const formSchemaPerfil = z.object({
    name: z.string().min(2, {
      message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    brithday: z.string().min(9, {
      message: "Data de aniversário de conter dia/mês/ano.",
    }),
    cep: z.string().min(8, {
      message: "CEP deve conter 8 digitos.",
    }),
    endereco: z.string().min(2, {
      message: "Rua deve ter pelo menos 2 caracteres.",
    }),
    numero: z.string().min(1, {
      message: "Número deve conter pelo menos 1 digito.",
    }),
    bairro: z.string().min(2, {
      message: "Bairro deve ter pelo menos 2 caracteres.",
    }),
    cidade: z.string().min(2, {
      message: "Cidade deve ter pelo menos 2 caracteres.",
    }),
    estado: z.string().min(2, {
      message: "Estado deve ter pelo menos 2 caracteres.",
    }),
    complemento: z.string().min(2, {
      message: "complemento deve ter pelo menos 2 caracteres.",
    }),
    whatsapp: z.string().min(11, {
      message: "Whatsapp deve conter 11 digitos.",
    }),
  });

  const formPerfil = useForm<z.infer<typeof formSchemaPerfil>>({
    resolver: zodResolver(formSchemaPerfil),
    defaultValues: {
      name: "",
      brithday: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
      whatsapp: "",
    },
  });

  const instrumentSchema = z.object({
    instruments: z
      .array(
        z.object({
          instrumentId: z
            .string()
            .min(1, { message: "Instrumento é obrigatório" }),
          owner: z.string().min(1, { message: "Proprietário é obrigatório" }),
          position: z.enum(["Primeiro", "Segundo", "Terceiro"], {
            message: "Posição é obrigatória",
          }),
          serie: z.string().optional(),
          brand: z.string().optional(),
          model: z.string().optional(),
        })
      )
      .optional(),
  });

  const instrumentForm = useForm<z.infer<typeof instrumentSchema>>({
    resolver: zodResolver(instrumentSchema),
    defaultValues: {
      instruments: [],
    },
  });

  return {
    instrumentForm,
    instrumentSchema,
    formPerfil,
    formSchemaPerfil,
  };
}
