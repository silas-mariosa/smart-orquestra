import { useState } from "react";
import FormSchemaMembros from "./formSchema";
import { toast } from "@/hooks/use-toast";
import { set } from "react-hook-form";
import { z } from "zod";

const positions = [
    "Primeiro",
    "Segundo",
    "Terceiro",
]

const instrumentOptions = [
    "Violão",
    "Piano",
    "Bateria",
    "Guitarra",
    "Baixo",
    "Saxofone - Tenor",
    "Saxofone - Barítono",
    "Saxofone - Alto",
    "Flauta",
    "Teclado"
]

const dataMembros = [
    {
        id: 1,
        nome: "Membro 1",
        position: "Primeiro",
        instrument: "Violão",
        birthdate: "1990-01-01",
        bairro: "Bairro 1",
        actived: true,
    },
    {
        id: 2,
        nome: "Membro 2",
        position: "Segundo",
        instrument: "Piano",
        birthdate: "1991-01-01",
        bairro: "Bairro 2",
        actived: true,
    },
    {
        id: 3,
        nome: "Membro 3",
        position: "Terceiro",
        instrument: "Bateria",
        birthdate: "1992-01-01",
        bairro: "Bairro 3",
        actived: true,
    },
]

export default function MembrosHook() {
    const { formSchema } = FormSchemaMembros(positions, instrumentOptions)

    const initiation: z.infer<typeof formSchema> = {
        nome: "",
        position: undefined,
        instrument: undefined,
        bairro: "",
        actived: false,
    }
    const [values, setValues] = useState<z.infer<typeof formSchema>>(initiation)

    const filteredData = dataMembros.filter((item) => {
        return (
            (!values.nome || item.nome.toLowerCase().includes(values.nome.toLowerCase())) &&
            (values.position === "" || values.position === undefined || item.position.toLowerCase().includes(values.position.toLowerCase())) &&
            (values.instrument === "" || values.instrument === undefined || item.instrument.toLowerCase().includes(values.instrument.toLowerCase())) &&
            (!values.bairro || item.bairro.toLowerCase().includes(values.bairro.toLowerCase())) &&
            (values.actived === false || values.actived === true || item.actived === values.actived)
        );
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)

        setValues({ ...data })
    }

    const resetForm = () => {
        setValues(initiation)
    }

    return { filteredData, onSubmit, resetForm }
}