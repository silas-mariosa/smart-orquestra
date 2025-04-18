import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaLouvores(
  intrumentos: string[],
  categoria: string[]
) {
  const formSchema = z.object({
    nomeLouvor: z.string(),
    descricao: z.string(),
    instrument: z
      .string()
      .refine((val) => intrumentos.includes(val))
      .optional(),
    categoria: z
      .string()
      .refine((val) => categoria.includes(val))
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeLouvor: "",
      descricao: "",
      instrument: undefined,
      categoria: undefined,
    },
  });

  return {
    form,
    formSchema,
  };
}
