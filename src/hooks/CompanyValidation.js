import * as Yup from "yup";
import ValidarCnpj from "./ValCpnj";

export const companyValidationSchema = Yup.object().shape({
  companyname: Yup.string()
    .required("Campo obrigatório.")
    .min(5, "Mínimo de 5 caracteres")
    .max(30, "Máximo de 30 caracteres"),
  fantasyname: Yup.string()
    .required("Campo obrigatório.")
    .min(5, "Mínimo de 5 caracteres")
    .max(40, "Máximo 40 caracteres"),
  dataAbertura: Yup.date()
    .required("Data obrigatória")
    .nullable()
    .transform((value, originalValue) => {
      // Se o valor for uma string vazia, retorna null
      if (originalValue === "") return null;
      return value;
    })
    .max(new Date(), "Data inválida")
    .test("empty-date", "Data obrigatória", function (value) {
      // Verifica se o valor é vazio
      if (!value || value === "") {
        return false;
      }
      // Se o valor não estiver vazio, retorna verdadeiro
      return true;
    }),
  cnpj: Yup.string()
    .required("Campo obrigatório.")
    .min(14, "O CNPJ deve ter 14 dígitos")
    .test("validar-cnpj", "CNPJ inválido", function (value) {
      const cnpj = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      if (cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
        console.log(cnpj);
        return false; // Retorna falso se o cnpj não tiver 14 dígitos ou conter caracteres não numéricos
      }
      console.log(ValidarCnpj(cnpj));
      return ValidarCnpj(cnpj); // Retorna o resultado da validação do CPF
    }),
  atividadeEco: Yup.string()
    .required("Campo obrigatório.")
    .length(6, "Deve conter 5 digitos")
    .test("validar-cnae", "CNAE inválido", (value) => {
      if (!value) return false;
      if (value.match(/\d{4}-\d$/)) {
        return true;
      }
    }),
  cep: Yup.string()
    .required("Campo obrigatório.")
    .length(9, "O Cep deve ter 8 digitos")
    .test("validar-cep", "CEP inválido", (value) => {
      if (!value) return false;
      if (value.match(/\d{5}-\d{3}$/)) {
        return true;
      }
    }),
  addressNumber: Yup.string().required("Campo obrigatório."),
  phone: Yup.string()
    .required("Campo obrigatório.")
    .min(11, "O telefone deve ter 11 dígitos")
    .test("validar-tel", "Número de telefone inválido", (value) => {
      if (!value) return false;
      if (
        value.match(/^\(\d{2}\) [3-9]\d{3}-\d{4}$/) ||
        value.match(/^(\([1-9]{2}\))\s?9\d{4}-?\d{4}$/)
      ) {
        return true;
      }
      return false;
    }),
  nj: Yup.string().required("Campo obrigatória."),
  capital: Yup.string().required("Campo obrigatório."),
});
