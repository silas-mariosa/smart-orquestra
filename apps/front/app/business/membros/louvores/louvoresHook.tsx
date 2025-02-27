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
		instrumento: "Violão",
		categoria: "Corda",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 2,
		nomeLouvor: "Louvor 2",
		descricao: "Descrição do louvor 2",
		instrumento: "Piano",
		categoria: "Teclas",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 3,
		nomeLouvor: "Louvor 3",
		descricao: "Descrição do louvor 3",
		instrumento: "Bateria",
		categoria: "Outros",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 4,
		nomeLouvor: "Louvor 4",
		descricao: "Descrição do louvor 4",
		instrumento: "Guitarra",
		categoria: "Corda",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 5,
		nomeLouvor: "Louvor 5",
		descricao: "Descrição do louvor 5",
		instrumento: "Baixo",
		categoria: "Corda",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 6,
		nomeLouvor: "Louvor 6",
		descricao: "Descrição do louvor 6",
		instrumento: "Saxofone - Tenor",
		categoria: "Sopro",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 7,
		nomeLouvor: "Louvor 7",
		descricao: "Descrição do louvor 7",
		instrumento: "Saxofone - Barítono",
		categoria: "Sopro",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 8,
		nomeLouvor: "Louvor 8",
		descricao: "Descrição do louvor 8",
		instrumento: "Saxofone - Alto",
		categoria: "Sopro",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 9,
		nomeLouvor: "Louvor 9",
		descricao: "Descrição do louvor 9",
		instrumento: "Flauta",
		categoria: "Sopro",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 10,
		nomeLouvor: "Louvor 10",
		descricao: "Descrição do louvor 10",
		instrumento: "Teclado",
		categoria: "Teclas",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 11,
		nomeLouvor: "Louvor 11",
		descricao: "Descrição do louvor 11",
		instrumento: "Violão",
		categoria: "Corda",
		pdf: "https://www.google.com/pdf",
		mp3: "https://www.google.com",
	},
	{
		id: 12,
		nomeLouvor: "Louvor 12",
		descricao: "Descrição do louvor 12",
		instrumento: "Violão",
		categoria: "Corda",
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

const CategoriaOptions = [
	"Corda",
	"Sopro",
	"Percussão",
	"Teclas",
	"Voz",
	"Outros",
]

export default function LouvoresHook() {
	const { formSchema } = FormSchemaLouvores(instrumentOptions, CategoriaOptions)

	const initiation: z.infer<typeof formSchema> = {
		nomeLouvor: "",
		descricao: "",
		instrument: undefined,
		categoria: undefined,
	}
	const [values, setValues] = useState<z.infer<typeof formSchema>>(initiation)

	const filteredData = dataLouvores.filter((item) => {
		return (
			(!values.nomeLouvor || item.nomeLouvor.toLowerCase().includes(values.nomeLouvor.toLowerCase())) &&
			(!values.descricao || item.descricao.toLowerCase().includes(values.descricao.toLowerCase())) &&
			(values.instrument === "" || values.instrument === undefined || item.instrumento.toLowerCase().includes(values.instrument.toLowerCase())) &&
			(values.categoria === "" || values.categoria === undefined || item.categoria.toLowerCase().includes(values.categoria.toLowerCase()))
		);
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {

		setValues({ ...values })

	}


	const resetForm = () => {
		setValues(initiation)
	}

	return {
		onSubmit,
		filteredData,
		resetForm
	}
}