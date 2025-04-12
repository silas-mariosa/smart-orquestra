import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaSheetInstrumentos() {
  const formSchema = z.object({
    nameInstrument: z.string().min(1, {
      message: "Prencha o campo de nome no instrumento",
    }),
    typeInstrument: z.string().optional(),
    categories: z.string().optional(),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameInstrument: "",
      categories: "",
      description: "",
      typeInstrument: "",
    },
  });

  return {
    form,
    formSchema,
  };
}
