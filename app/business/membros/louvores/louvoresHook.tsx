import { useState } from "react";
import FormSchemaLouvores from "./formSchema";
import { LouvorType } from "@/hooks/louvoresHooks/louvoresHooks";
import LouvoresAPIs from "@/hooks/louvoresHooks/louvoresHooks";
import InstrumentosAPIs from "@/hooks/instrumentosHooks/instrumentosHooks";
import CategoriesHooks from "@/hooks/categoriesHooks/categoriesHooks";

export default function LouvoresHook() {
	const { formSchema } = FormSchemaLouvores()
	const { louvores, louvoresIsLoading, louvoresError } = LouvoresAPIs()
	const { instrumentos, instrumentosIsLoading } = InstrumentosAPIs()
	const { categories, categoriesIsLoading } = CategoriesHooks()

	const initiation = {
		nomeLouvor: "",
		descricao: "",
		instrument: undefined as string | undefined,
		categoria: undefined as string | undefined,
	}
	const [values, setValues] = useState(initiation)

	// Filtra os dados reais da API baseado nos valores do formulário
	const filteredData = (louvores || []).filter((item: LouvorType) => {
		return (
			(!values.nomeLouvor || item.nameLouvor.toLowerCase().includes(values.nomeLouvor.toLowerCase())) &&
			(!values.descricao || item.description.toLowerCase().includes(values.descricao.toLowerCase())) &&
			(values.instrument === "" || values.instrument === undefined || (item.instrumentoName && item.instrumentoName.toLowerCase().includes(values.instrument.toLowerCase()))) &&
			(values.categoria === "" || values.categoria === undefined || (item.instrumentoCategories && item.instrumentoCategories.toLowerCase().includes(values.categoria.toLowerCase())))
		);
	});

	const onSubmit = (formValues: any) => {
		console.log("Form values received:", formValues);
		// Limpar valores vazios ou undefined
		const cleanedValues = {
			nomeLouvor: formValues.nomeLouvor || "",
			descricao: formValues.descricao || "",
			instrument: formValues.instrument || undefined,
			categoria: formValues.categoria || undefined,
		};
		console.log("Cleaned values:", cleanedValues);
		setValues(cleanedValues);
	}

	const resetForm = () => {
		setValues(initiation)
	}

	// Extrair nomes únicos dos instrumentos para o select
	const instrumentOptions = Array.from(new Set(
		instrumentos?.map((instrument: any) => instrument.nameInstrument) || []
	)).sort();

	// Extrair nomes únicos das categorias para o select
	const categoriaOptions = Array.from(new Set(
		categories?.map((category: any) => category.name) || []
	)).sort();

	return {
		onSubmit,
		filteredData,
		resetForm,
		louvoresIsLoading,
		louvoresError,
		instrumentOptions,
		instrumentosIsLoading,
		categoriaOptions,
		categoriesIsLoading
	}
}