"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaPerfil() {
  const formSchemaPerfil = z.object({
    username: z.string().min(2, {
      message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    birthday: z.string().min(9, {
      message: "Data de aniversário de conter dia/mês/ano.",
    }),
    cep: z.string().min(8, {
      message: "CEP deve conter 8 digitos.",
    }),
    street: z.string().min(2, {
      message: "Rua deve ter pelo menos 2 caracteres.",
    }),
    number: z.string().min(1, {
      message: "Número deve conter pelo menos 1 digito.",
    }),
    neiborhood: z.string().min(2, {
      message: "Bairro deve ter pelo menos 2 caracteres.",
    }),
    city: z.string().min(2, {
      message: "Cidade deve ter pelo menos 2 caracteres.",
    }),
    complement: z.string().min(2, {
      message: "Complemento deve ter pelo menos 2 caracteres.",
    }),
    whatsapp: z.string().min(11, {
      message: "Whatsapp deve conter 11 digitos.",
    }),
  });

  const formPerfil = useForm<z.infer<typeof formSchemaPerfil>>({
    resolver: zodResolver(formSchemaPerfil),
    defaultValues: {
      username: "",
      birthday: "",
      cep: "",
      street: "",
      number: "",
      neiborhood: "",
      city: "",
      complement: "",
      whatsapp: "",
    },
  });

  const instrumentSchema = z.object({
    instruments: z
      .array(
        z.object({
          instrument: z.string().min(1, "Selecione um instrumento"),
          isOwn: z.boolean(),
          serial: z.string().min(1, "Serial é obrigatório"),
          position: z.string().min(1, "Posição é obrigatória"),
          brand: z.string().min(1, "Marca é obrigatória"),
          model: z.string().min(1, "Modelo é obrigatório"),
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

  return { formPerfil, formSchemaPerfil, instrumentForm, instrumentSchema };
}
