import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaAddLouvores(
  intrumentos: string[],
  categoria: string[]
) {
  const formSchema = z.object({
    nomeLouvor: z.string().min(1, { message: "Nome do louvor é obrigatório" }),
    descricao: z.string().min(1, { message: "Descrição é obrigatória" }),
    instrument: z.string().optional(),
    categoria: z.string().optional(),
    pdf: z.string().optional(),
    mp3: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeLouvor: "",
      descricao: "",
      instrument: undefined,
      categoria: undefined,
      pdf: "",
      mp3: "",
    },
  });

  return {
    form,
    formSchema,
  };
}
