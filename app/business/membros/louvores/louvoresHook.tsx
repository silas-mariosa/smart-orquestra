import { useState } from "react";
import FormSchemaLouvores from "./formSchema";
import { LouvorType } from "@/hooks/louvoresHooks/louvoresHooks";
import LouvoresAPIs from "@/hooks/louvoresHooks/louvoresHooks";
import InstrumentosAPIs from "@/hooks/instrumentosHooks/instrumentosHooks";

export default function LouvoresHook() {
	const { formSchema } = FormSchemaLouvores()
	const { louvores, louvoresIsLoading, louvoresError } = LouvoresAPIs()
	const { instrumentos, instrumentosIsLoading } = InstrumentosAPIs()

	const initiation = {
		nomeLouvor: "",
		descricao: "",
		instrument: "",
	}
	const [values, setValues] = useState(initiation)

	// Filtra os dados reais da API baseado nos valores do formulário
	const filteredData = (louvores || []).filter((item: LouvorType) => {
		// Filtro por nome
		const nomeMatch = !values.nomeLouvor ||
			item.nameLouvor.toLowerCase().includes(values.nomeLouvor.toLowerCase());

		// Filtro por descrição
		const descricaoMatch = !values.descricao ||
			item.description.toLowerCase().includes(values.descricao.toLowerCase());

		// Filtro por instrumento - comparação exata
		const instrumentMatch = values.instrument === "" ||
			(item.instrumentos && item.instrumentos.trim().toLowerCase() === values.instrument.trim().toLowerCase());

		// Debug para verificar os valores
		if (values.instrument && values.instrument !== "") {
			console.log(`Filtrando instrumento: "${item.nameLouvor}"`, {
				itemInstrumentos: `"${item.instrumentos}"`,
				filterInstrument: `"${values.instrument}"`,
				instrumentMatch,
				trimmedItem: `"${item.instrumentos?.trim()}"`,
				trimmedFilter: `"${values.instrument.trim()}"`
			});
		}

		return nomeMatch && descricaoMatch && instrumentMatch;
	});

	const onSubmit = (formValues: any) => {
		console.log("Form values received:", formValues);
		// Limpar valores vazios ou undefined
		const cleanedValues = {
			nomeLouvor: formValues.nomeLouvor || "",
			descricao: formValues.descricao || "",
			instrument: formValues.instrument || "",
		};
		console.log("Cleaned values:", cleanedValues);
		setValues(cleanedValues);
	}

	const resetForm = () => {
		setValues(initiation)
	}

	// Extrair nomes únicos dos instrumentos para o select
	const instrumentOptions = Array.from(new Set(
		instrumentos?.map((instrument: any) => instrument.nameInstrument).filter(Boolean) || []
	)).sort();

	console.log("Instrumentos carregados:", instrumentos);
	console.log("Opções de instrumentos:", instrumentOptions);

	return {
		onSubmit,
		filteredData,
		resetForm,
		louvoresIsLoading,
		louvoresError,
		instrumentOptions,
		instrumentosIsLoading
	}
}