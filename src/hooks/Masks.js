export const useMask = () => {
  const maskCnae = (e) => {
    let digits = e.replace(/\D/g, "");

    // Aplica a máscara "0000-0"
    if (digits.length > 4) {
      let maskC = digits.slice(0, 4) + "-" + digits.slice(4, 5);
      return maskC;
    }
    return digits;
  };

  const maskCurrency = (valor, locale = "pt-BR", currency = "BRL") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(valor);
  };

  const maskCnpj = (cnpj) => {
    if (!cnpj) return "";

    cnpj = cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );

    return cnpj;
  };

  const cpfMask = (cpf) => {
    if (!cpf) return "";
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    return cpf;
  };

  const maskCep = (cep) => {
    if (!cep) return "";
    cep = cep.replace(/^(\d{5})(\d{3})/, "$1-$2");
    return cep;
  };

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  return { maskCnae, maskCurrency, maskCnpj, maskCep, phoneMask, cpfMask };
};
