import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { z } from "zod";
import FormSchemaLouvores from "./formSchema";



type DataLouvores = {
    id: number,
    nomeLouvor: string,
    descricao: string,
    instrumento: string,
    categoria: string,
    pdf: string,
    mp3: string,
}

const dataLouvores = [
    {
        id: 1,
        nomeLouvor: "Louvor 1",
        descricao: "Descrição do louvor 1",
        instrumento: "Instrumento 1",
        categoria: "Categoria 1",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 2,
        nomeLouvor: "Louvor 2",
        descricao: "Descrição do louvor 2",
        instrumento: "Instrumento 2",
        categoria: "Categoria 2",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 3,
        nomeLouvor: "Louvor 3",
        descricao: "Descrição do louvor 3",
        instrumento: "Instrumento 3",
        categoria: "Categoria 3",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 4,
        nomeLouvor: "Louvor 4",
        descricao: "Descrição do louvor 4",
        instrumento: "Instrumento 4",
        categoria: "Categoria 4",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 5,
        nomeLouvor: "Louvor 5",
        descricao: "Descrição do louvor 5",
        instrumento: "Instrumento 5",
        categoria: "Categoria 5",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 6,
        nomeLouvor: "Louvor 6",
        descricao: "Descrição do louvor 6",
        instrumento: "Instrumento 6",
        categoria: "Categoria 6",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 7,
        nomeLouvor: "Louvor 7",
        descricao: "Descrição do louvor 7",
        instrumento: "Instrumento 7",
        categoria: "Categoria 7",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 8,
        nomeLouvor: "Louvor 8",
        descricao: "Descrição do louvor 8",
        instrumento: "Instrumento 8",
        categoria: "Categoria 8",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 9,
        nomeLouvor: "Louvor 9",
        descricao: "Descrição do louvor 9",
        instrumento: "Instrumento 9",
        categoria: "Categoria 9",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 10,
        nomeLouvor: "Louvor 10",
        descricao: "Descrição do louvor 10",
        instrumento: "Instrumento 10",
        categoria: "Categoria 10",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 11,
        nomeLouvor: "Louvor 11",
        descricao: "Descrição do louvor 11",
        instrumento: "Instrumento 11",
        categoria: "Categoria 11",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    },
    {
        id: 12,
        nomeLouvor: "Louvor 12",
        descricao: "Descrição do louvor 12",
        instrumento: "Instrumento 12",
        categoria: "Categoria 12",
        pdf: "https://www.google.com/pdf",
        mp3: "https://www.google.com",
    }
]

interface ProfileFormProps {
    type: string,
    label: string,
    placeholder: string,
    typeInput: string,
}

const inputs = [
    {
        type: "nomeLouvor",
        label: "Louvor",
        placeholder: "Preencha o nome do louvor",
        typeInput: "text",
    },
    {
        type: "descricao",
        label: "Descrição",
        placeholder: "Preencha a descrição",
        typeInput: "text",
    },
    {
        type: "instrumento",
        label: "Instrumento",
        placeholder: "Preencha o nome do instrumento",
        typeInput: "text",
    },
    {
        type: "categoria",
        label: "Categoria",
        placeholder: "Preencha a categoria do instrumento",
        typeInput: "text",
    }
]


export default function LouvoresHook() {
    const { formSchema } = FormSchemaLouvores()
    const inputFiltes = inputs

    const initiation: z.infer<typeof formSchema> = {
        nomeLouvor: "",
        descricao: "",
        instrumento: "",
        categoria: "",
    }
    const [values, setValues] = useState<z.infer<typeof formSchema>>(initiation)

    const filteredData = dataLouvores.filter((item) => {
        return (
            (!values.nomeLouvor || item.nomeLouvor.toLowerCase().includes(values.nomeLouvor.toLowerCase())) &&
            (!values.descricao || item.descricao.toLowerCase().includes(values.descricao.toLowerCase())) &&
            (!values.instrumento || item.instrumento.toLowerCase().includes(values.instrumento.toLowerCase())) &&
            (!values.categoria || item.categoria.toLowerCase().includes(values.categoria.toLowerCase()))
        );
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {

        setValues({ ...values })

        toast({
            title: "Você enviou o formulário com sucesso!",
            description: "Obrigado pelo seu feedback.",
        });
    }


    const resetForm = () => {
        setValues(initiation)
    }

    return {
        onSubmit,
        filteredData,
        inputFiltes,
        resetForm
    }
}