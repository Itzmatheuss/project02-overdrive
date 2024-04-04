import * as Yup from "yup";

export const companyValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "O campo deve ter no mínimo 3 caracteres")
    .required("O nome é obrigatório."),
  fantasyname: Yup.string()
    .min(3, "O campo deve ter no mínimo 3 caracteres")
    .required("O nome fantasia é obrigatório."),
  date: Yup.date()
    .max(new Date(), "Não é possivel incluir uma data futura")
    .required("Data obrigatória"),
  cnpj: Yup.string()
    .length(14, "O CNPJ deve ter 11 dígitos")
    .required("O CNPJ é obrigatório."),
  atividadeeco: Yup.string().required("A atividade é obrigatória.").length(),
  nj: Yup.string()

    .length(14, "O telefone deve ter 10 ou 11 dígitos")
    .required("O telefone é obrigatório."),
  cep: Yup.string()
    .length(14, "O CPF deve ter 11 dígitos")
    .required("O CPF é obrigatório."),
  cidade: Yup.string()
    .length(14, "O CPF deve ter 11 dígitos")
    .required("O CPF é obrigatório."),
  rua: Yup.string()
    .length(14, "O CPF deve ter 11 dígitos")
    .required("O CPF é obrigatório."),
  bairro: Yup.string()
    .length(14, "O CPF deve ter 11 dígitos")
    .required("O CPF é obrigatório."),
  numero: Yup.string()
    .length(14, "O CPF deve ter 11 dígitos")
    .required("O CPF é obrigatório."),
  telefone: Yup.string()
    .length(14, "O CPF deve ter 11 dígitos")
    .required("O CPF é obrigatório."),
  privacyTerms: Yup.bool().oneOf([true], "É necessário aceitar os termos."),
});
