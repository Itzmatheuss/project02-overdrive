const validarCpf = (cpf) => {
  // Remove todos os caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se o CPF não é composto apenas por dígitos repetidos
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

  // Verifica se o primeiro dígito verificador calculado é igual ao fornecido
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

  // Verifica se o segundo dígito verificador calculado é igual ao fornecido
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    return false;
  }

  // Se todas as verificações passaram, o CPF é válido
  return true;
};

export default validarCpf;
