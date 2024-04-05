import * as Yup from "yup";

export const companyValidationSchema = Yup.object().shape({
  companyname: Yup.string()
    .min(5, "Mínimo de 5 caracteres")
    .max(30, "Máximo de 30 caracteres")
    .required("Campo obrigatório."),
  fantasyname: Yup.string()
    .min(5, "Mínimo de 5 caracteres")
    .max(40, "Máximo 40 caracteres")
    .required("Campo obrigatório."),
  dataAbertura: Yup.date()
    .nullable()
    .transform((value, originalValue) => {
      // Se o valor for uma string vazia, retorna null
      if (originalValue === "") return null;
      return value;
    })
    .max(new Date(), "Não é possível incluir uma data futura")
    .required("Data obrigatória")
    .test("empty-date", "Data obrigatória", function (value) {
      // Verifica se o valor é vazio
      if (!value || value === "") {
        return false;
      }
      // Se o valor não estiver vazio, retorna verdadeiro
      return true;
    }),
  cnpj: Yup.string()
    .length(18, "O CNPJ deve ter 14 dígitos")
    .required("Campo obrigatório."),
  atividadeEco: Yup.string()
    .length(6, "Deve conter 5 digitos")
    .required("Campo obrigatório."),
  nj: Yup.string()

    .length(14, "O telefone deve ter 10 ou 11 dígitos")
    .required("Campo obrigatório."),
  cep: Yup.string()
    .length(8, "O Cep deve ter 8 digitos")
    .required("Campo obrigatório."),
  city: Yup.string().required("Campo obrigatória."),
  address: Yup.string().required("Campo obrigatória."),
  addressNumber: Yup.string().required("Campo obrigatório."),
  neighborhood: Yup.string().required("Campo obrigatório."),
  uf: Yup.string().required("Campo obrigatório."),
  phone: Yup.string()
    .test("validar-tel", "Número de telefone inválido", (value) => {
      if (!value) return false;
      if (
        value.match(/^\(\d{2}\) [3-9]\d{3}-\d{4}$/) ||
        value.match(/^(\([1-9]{2}\))\s?9\d{4}-?\d{4}$/)
      ) {
        return true;
      }
      return false;
    })
    .min(11, "O telefone deve ter 11 dígitos")
    .required("Campo obrigatório."),
  nj: Yup.string().required("Campo obrigatória."),
  capital: Yup.string().required("Campo obrigatório."),
});
