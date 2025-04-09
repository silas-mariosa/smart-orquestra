import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaAddLouvores(
  intrumentos: string[],
  categoria: string[]
) {
  const formSchema = z.object({
    nomeLouvor: z.string(),
    descricao: z.string(),
    instrument: z.string().refine((val) => intrumentos.includes(val)),
    categoria: z.string().refine((val) => categoria.includes(val)),
    pdf: z.string().min(1, { message: "Digite a url do google drive do PRD" }),
    mp3: z.string().min(1, { message: "Digite a url do google drive do MP3" }),
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
