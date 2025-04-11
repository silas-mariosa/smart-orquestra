"use client";

import { z } from "zod";
import FormSchemaInstrumentos from "./formSchema";
import { useState } from "react";
import InstrumentosHooks from "@/hooks/instrumentosHooks/instrumentosHooks";

export default function InstrumentoHook() {
  const { formSchema, form } = FormSchemaInstrumentos();

  const {
    instrumentos,
    instrumentosError,
    instrumentosIsLoading,
    refetchInstrumentos,
  } = InstrumentosHooks();

  const initiation: z.infer<typeof formSchema> = {
    nameInstrument: "",
    categories: "",
  };
  const [values, setValues] = useState<z.infer<typeof formSchema>>(initiation);

  const filteredData = (instrumentos ?? []).filter((item) => {
    return (
      (!values.nameInstrument ||
        item.nameInstrument
          ?.toLowerCase()
          .includes(values.nameInstrument.toLowerCase())) &&
      (!values.categories ||
        item.categories
          ?.toLowerCase()
          .includes(values.categories.toLowerCase()))
    );
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("onSubmit: ", data);
    setValues({ ...data });
  };

  const resetForm = () => {
    setValues(initiation);
    form.reset(initiation);
  };

  return { filteredData, onSubmit, resetForm, form };
}
