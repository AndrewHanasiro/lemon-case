import {
  ClassesDeConsumo,
  ModalidadesTarifarias,
  RawInput,
  respostasNegativas,
  TiposDeConexao,
} from "./entities";

export function analyze(input: RawInput) {
  const elegivelConsumo = analizeConsumo(
    input.classeDeConsumo as ClassesDeConsumo
  );
  const elegivelTarifa = analizeTarifa(
    input.modalidadeTarifaria as ModalidadesTarifarias
  );
  const soma = input.historicoDeConsumo.reduce(
    (output, curr) => output + curr,
    0
  );
  const elegivelConexaoEHistorico = analizeConexaoEHistorico(input, soma);
  const elegivel =
    elegivelConsumo && elegivelTarifa && elegivelConexaoEHistorico;
  if (elegivel) {
    return {
      elegivel,
      economiaAnualDeCO2: (soma * 84) / 1000,
    };
  } else {
    let temp: respostasNegativas[] = [];
    if (!elegivelConsumo) temp = [...temp, respostasNegativas.classe];
    if (!elegivelTarifa) temp = [...temp, respostasNegativas.modalidade];
    if (!elegivelConexaoEHistorico)
      temp = [...temp, respostasNegativas.consumo];
    return {
      elegivel,
      razoesInelegibilidade: temp,
    };
  }
}

function analizeConsumo(input: ClassesDeConsumo) {
  return [
    ClassesDeConsumo.comercial,
    ClassesDeConsumo.residencial,
    ClassesDeConsumo.industrial,
  ].includes(input);
}

function analizeTarifa(input: ModalidadesTarifarias) {
  return [
    ModalidadesTarifarias.convencional,
    ModalidadesTarifarias.branca,
  ].includes(input as ModalidadesTarifarias);
}

function analizeConexaoEHistorico(input: RawInput, soma: number) {
  const media = soma / input.historicoDeConsumo.length;
  switch (input.tipoDeConexao) {
    case TiposDeConexao.monofasico:
      return media > 400;
    case TiposDeConexao.bifasico:
      return media > 500;
    case TiposDeConexao.trifasico:
      return media > 750;
    default:
      throw new Error("Algo deu muito errado no validator");
  }
}
