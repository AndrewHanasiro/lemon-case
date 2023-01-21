export interface ValidatedInput {
  numeroDoDocumento: DocType;
  tipoDeConexao: TiposDeConexao;
  classeDeConsumo: ClassesDeConsumo;
  modalidadeTarifaria: ModalidadesTarifarias;
  historicoDeConsumo: number[];
}

export interface RawInput {
  numeroDoDocumento: string;
  tipoDeConexao: string;
  classeDeConsumo: string;
  modalidadeTarifaria: string;
  historicoDeConsumo: number[];
}

export interface OutputYES {
  elegivel: true; // always true
  economiaAnualDeCO2: number;
}

export interface OutputNO {
  elegivel: false; // always false
  razoesDeInelegibilidade: respostasNegativas[];
}

export type Doc = {
  type: string;
  pattern: string;
  example: string;
};

export enum DocType {
  CPF = "CPF",
  CNPJ = "CNPj",
}
export enum TiposDeConexao {
  monofasico = "monofasico",
  bifasico = "bifasico",
  trifasico = "trifasico",
}

export enum ClassesDeConsumo {
  residencial = "residencial",
  industrial = "industrial",
  comercial = "comercial",
  rural = "rural",
  poderPublico = "poderPublico",
}

export enum ModalidadesTarifarias {
  azul = "azul",
  branca = "branca",
  verde = "verde",
  convencional = "convencional",
}

export enum respostasNegativas {
  classe = "Classe de consumo não aceita",
  modalidade = "Modalidade tarifária não aceita",
  consumo = "Consumo muito baixo para tipo de conexão",
}
