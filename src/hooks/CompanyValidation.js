import * as Yup from "yup";
import ValidarCnpj from "./ValCpnj";

export const companyValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Campo obrigatório.")
    .min(5, "Mínimo de 5 caracteres")
    .max(30, "Máximo de 30 caracteres"),
  nomeFantasia: Yup.string()
    .required("Campo obrigatório.")
    .min(5, "Mínimo de 5 caracteres")
    .max(40, "Máximo 40 caracteres"),
  dataCadastro: Yup.date()
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
      if (!value) return false;
      const cnpj = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      if (cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
        return false; // Retorna falso se o cnpj não tiver 14 dígitos ou conter caracteres não numéricos
      }
      return ValidarCnpj(cnpj); // Retorna o resultado da validação do CPF
    }),
  cnae: Yup.string()
    .required("Campo obrigatório.")
    .min(5, "Deve conter 5 digitos"),
  cep: Yup.string()
    .required("Campo obrigatório.")
    .min(8, "O Cep deve ter 8 digitos"),
  cidade: Yup.string().required("Campo obrigatório."),
  rua: Yup.string().required("Campo obrigatório."),
  bairro: Yup.string().required("Campo obrigatório."),
  numero: Yup.string().required("Campo obrigatório."),
  telefone: Yup.string()
    .required("Campo obrigatório.")
    .min(11, "O telefone deve ter 11 dígitos")
    .test("validar-tel", "Número de telefone inválido", (value) => {
      if (!value) return false;
      const tel = value.replace(/\D/g, "");
      if (tel.length === 11 || tel.length === 10) {
        return true;
      }
      return false;
    }),
  naturezaJuridica: Yup.string().required("Campo obrigatória."),
  capital: Yup.string().required("Campo obrigatório."),
});
