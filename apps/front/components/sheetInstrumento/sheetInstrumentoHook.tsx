import { InstrumentosType } from "@/app/business/admin/instrumentos/IInstrumentosDTO";
import InstrumentosAPIs from "@/hooks/instrumentosHooks/instrumentosHooks";

export default function SheetInstrumentoHook() {
  const { mutatePostInstrumentos, postPending, postSuccess } = InstrumentosAPIs()

  const onSubmit = (data: InstrumentosType) => {
    mutatePostInstrumentos({
      nameInstrument: data.nameInstrument,
      categories: data.categories,
      description: data.description,
      typeInstrument: data.typeInstrument,
    });
  }


  return { onSubmit, postPending, postSuccess };
}
