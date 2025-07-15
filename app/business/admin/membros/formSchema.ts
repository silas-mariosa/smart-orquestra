import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaMembros(
  intrumentos: string[],
  positions: string[]
) {
  const formSchema = z.object({
    nome: z.string().optional(),
    position: z
      .string()
      .refine((val) => positions.includes(val))
      .optional(),
    instrument: z
      .string()
      .refine((val) => intrumentos.includes(val))
      .optional(),
    bairro: z.string().optional(),
    actived: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      position: undefined,
      instrument: undefined,
      bairro: "",
      actived: true,
    },
  });

  return { form, formSchema };
}
