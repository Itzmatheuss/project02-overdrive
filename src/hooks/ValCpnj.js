/* eslint-disable */

const ValidarCnpj = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  console.log(typeof cnpj);

  if (cnpj.length != 14) return false;

  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  var tamanhoTotal = cnpj.length - 2;
  var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
  var digitosVerificadores = cnpj.substring(tamanhoTotal);
  var soma = 0;
  var pos = tamanhoTotal - 7;
  var i = 0;
  for (i = tamanhoTotal; i >= 1; i--) {
    soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
    if (pos < 2) pos = 9;
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitosVerificadores.charAt(0)) return false;

  tamanhoTotal = tamanhoTotal + 1;
  cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
  soma = 0;
  pos = tamanhoTotal - 7;
  for (i = tamanhoTotal; i >= 1; i--) {
    soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitosVerificadores.charAt(1)) return false;

  return true;
};

export default ValidarCnpj;
