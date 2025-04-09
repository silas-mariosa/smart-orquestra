import { formatarNumeroCelular } from "@/config/formater";

interface ProfileFormProps {
  type: string;
  label: string;
  placeholder: string;
  typeInput: string;
  func?: any;
}

export const inputs: ProfileFormProps[] = [
  {
    type: "name",
    label: "Nome completo",
    placeholder: "Preencha seu nome completo",
    typeInput: "text",
  },
  {
    type: "brithday",
    label: "Data de aniversário",
    placeholder: "xx/xx/xxxx",
    typeInput: "date",
  },
  {
    type: "whatsapp",
    label: "Whatsapp",
    placeholder: "Preencha o número do whatsapp",
    typeInput: "text",
    func: formatarNumeroCelular,
  },
];
