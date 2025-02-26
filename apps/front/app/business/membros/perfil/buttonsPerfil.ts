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
    type: "cep",
    label: "CEP",
    placeholder: "xxxx-xxx",
    typeInput: "text",
  },
  {
    type: "street",
    label: "Rua",
    placeholder: "Preencha o nome da rua",
    typeInput: "text",
  },
  {
    type: "number",
    label: "Número",
    placeholder: "Preencha o número",
    typeInput: "text",
  },
  {
    type: "neiborhood",
    label: "Bairro",
    placeholder: "Preencha o bairro",
    typeInput: "text",
  },
  {
    type: "city",
    label: "Cidade",
    placeholder: "Preencha a cidade",
    typeInput: "text",
  },
  {
    type: "complement",
    label: "Complemento",
    placeholder: "Preencha o complemento",
    typeInput: "text",
  },
  {
    type: "whatsapp",
    label: "Whatsapp",
    placeholder: "Preencha o número do whatsapp",
    typeInput: "text",
  },
];
