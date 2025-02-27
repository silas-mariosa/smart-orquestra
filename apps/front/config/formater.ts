export const formatarDataAniversario = (valor: string) => {
  // Remove todos os caracteres não numéricos
  const apenasNumeros = valor.replace(/[^\d]/g, "");

  // Aplica a formatação condicionalmente conforme o comprimento das partes
  const parte1 = apenasNumeros.slice(0, 2);
  const parte2 = apenasNumeros.slice(2, 4);
  const parte3 = apenasNumeros.slice(4, 8);

  let numeroFormatado = "";

  if (parte1) {
    numeroFormatado += `${parte1}`;
  }
  if (parte2) {
    numeroFormatado += `/${parte2}`;
  }
  if (parte3) {
    numeroFormatado += `/${parte3}`;
  }

  return numeroFormatado;
};

export const formatarCep = (valor: string) => {
  // Remove todos os caracteres não numéricos
  const apenasNumeros = valor.replace(/[^\d]/g, "");

  // Aplica a formatação condicionalmente conforme o comprimento das partes
  const parte1 = apenasNumeros.slice(0, 5);
  const parte2 = apenasNumeros.slice(5, 8);

  let cepFormatado = "";

  if (parte1) {
    cepFormatado += parte1;
  }
  if (parte2) {
    cepFormatado += `-${parte2}`;
  }

  return cepFormatado;
};
