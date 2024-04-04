import * as Yup from "yup";
import validarCpf from "../hooks/Mask";

export const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "O campo deve ter no mínimo 3 caracteres")
    .required("O nome é obrigatório."),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O email é obrigatório."),
  cpf: Yup.string()
    .test("validar-cpf", "CPF inválido", (value) => {
      if (!value) return false; // Retorna falso se o valor não estiver definido
      const cpf = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
        return false; // Retorna falso se o CPF não tiver 11 dígitos ou conter caracteres não numéricos
      }
      return validarCpf(cpf); // Retorna o resultado da validação do CPF
    })
    .required("O cpf é obrigatório."),
  telefone: Yup.string()
    .min(10, "O telefone deve ter 11 dígitos")
    .required("O telefone é obrigatório."),
  privacyTerms: Yup.bool().oneOf([true], "É necessário aceitar os termos."),
});
