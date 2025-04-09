import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaInstrumentos() {
  const formSchema = z.object({
    nameInstrument: z.string().optional(),
    categoria: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameInstrument: "",
      categoria: undefined,
    },
  });

  return {
    form,
    formSchema,
  };
}
