import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaLouvores() {
  const formSchema = z.object({
    nomeLouvor: z.string(),
    descricao: z.string(),
    instrumento: z.string(),
    categoria: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeLouvor: "",
      descricao: "",
      instrumento: "",
      categoria: "",
    },
  });

  return {
    form,
    formSchema,
  };
}
