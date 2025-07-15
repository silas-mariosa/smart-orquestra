import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormSchemaLouvores() {
  const formSchema = z.object({
    nomeLouvor: z.string(),
    descricao: z.string(),
    instrument: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeLouvor: "",
      descricao: "",
      instrument: "",
    },
  });

  return {
    form,
    formSchema,
  };
}
