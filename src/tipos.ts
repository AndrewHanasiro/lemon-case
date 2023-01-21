export const cpf = {
  type: "string",
  pattern: "^\\d{11}$",
  example: "21554495008",
};

export const cnpj = {
  type: "string",
  pattern: "^\\d{14}$",
  example: "33400689000109",
};

export const tiposDeConexao = ["monofasico", "bifasico", "trifasico"];

export const classesDeConsumo = [
  "residencial",
  "industrial",
  "comercial",
  "rural",
  "poderPublico",
];

export const modalidadesTarifarias = [
  "azul",
  "branca",
  "verde",
  "convencional",
];
