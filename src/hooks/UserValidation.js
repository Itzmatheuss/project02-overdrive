import * as Yup from "yup";
import validarCpf from "./ValCpf";

export const userValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "Mínimo de 3 caracteres")
    .required("Campo obrigatório."),
  username: Yup.string()
    .min(3, "Mínimo de 3 caracteres")
    .required("Campo obrigatório."),
  cpf: Yup.string()
    .test("validar-cpf", "CPF inválido", (value) => {
      if (!value) return false; // Retorna falso se o valor não estiver definido
      const cpf = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
        return false; // Retorna falso se o CPF não tiver 11 dígitos ou conter caracteres não numéricos
      }
      return validarCpf(cpf); // Retorna o resultado da validação do CPF
    })
    .min(11, "O cpf deve ter 11 caracteres")
    .required("Campo obrigatório."),
  telefone: Yup.string()
    .test("validar-tel", "Número de telefone inválido", (value) => {
      if (!value) return false;
      const tel = value.replace(/\D/g, "");
      if (tel.length === 11 || tel.length === 10) {
        return true;
      }
      return false;
    })
    .min(11, "O telefone deve ter 11 dígitos")
    .required("Campo obrigatório."),
});
