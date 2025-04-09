import { z } from "zod";
import FormSchemaInstrumentos from "./formSchema";
import { useState } from "react";

const CategoriaOptions = [
  "Corda",
  "Sopro",
  "Percussão",
  "Teclas",
  "Voz",
  "Outros",
];

const dataMembros = [
  { id: 1, nameInstrument: "Violão", categoria: "Corda" },
  { id: 2, nameInstrument: "Piano", categoria: "Teclas" },
  { id: 3, nameInstrument: "Bateria", categoria: "Percussão" },
  { id: 4, nameInstrument: "Guitarra", categoria: "Corda" },
  { id: 5, nameInstrument: "Baixo", categoria: "Corda" },
  { id: 6, nameInstrument: "Saxofone Tenor", categoria: "Sopro" },
];

export default function InstrumentoHook() {
  const { formSchema } = FormSchemaInstrumentos();

  const initiation: z.infer<typeof formSchema> = {
    nameInstrument: "",
    categoria: undefined,
  };
  const [values, setValues] = useState<z.infer<typeof formSchema>>(initiation);

  const filteredData = dataMembros.filter((item) => {
    return (
      (!values.nameInstrument ||
        item.nameInstrument
          .toLowerCase()
          .includes(values.nameInstrument.toLowerCase())) &&
      (values.categoria === "" ||
        values.categoria === undefined ||
        item.categoria.toLowerCase().includes(values.categoria.toLowerCase()))
    );
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);

    setValues({ ...data });
  };

  const resetForm = () => {
    setValues(initiation);
  };

  return { filteredData, onSubmit, resetForm };
}
