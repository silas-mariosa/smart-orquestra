interface ProfileFormProps {
  type: string;
  label: string;
  placeholder: string;
  typeInput: string;
}

export const inputs: ProfileFormProps[] = [
  {
    type: "username",
    label: "Nome completo",
    placeholder: "Preencha seu nome completo",
    typeInput: "text",
  },
  {
    type: "birthday",
    label: "Data de aniversário",
    placeholder: "xx/xx/xxxx",
    typeInput: "date",
  },
  {
    type: "whatsapp",
    label: "Whatsapp",
    placeholder: "Preencha o número do whatsapp",
    typeInput: "text",
  },
];
