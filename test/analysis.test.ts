import { expect } from "chai";
import { analyze } from "../src/analysis";

describe("Analysis", () => {
  const workingArray = [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
  ];
  const failingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  it("analyze should succeed", () => {
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: workingArray,
    };
    const result = analyze(input);
    expect(result).to.be.deep.equal({
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
    });
  });

  it("analyze should fail with issues respostasNegativas.classe", () => {
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "rural",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: workingArray,
    };
    const result = analyze(input);
    expect(result).to.be.deep.equal({
      elegivel: false,
      razoesInelegibilidade: ["Classe de consumo não aceita"],
    });
  });

  it("analyze should fail with issues respostasNegativas.modalidade", () => {
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "verde",
      historicoDeConsumo: workingArray,
    };
    const result = analyze(input);
    expect(result).to.be.deep.equal({
      elegivel: false,
      razoesInelegibilidade: ["Modalidade tarifária não aceita"],
    });
  });

  it("analyze should fail with issues respostasNegativas.consumo", () => {
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: failingArray,
    };
    const result = analyze(input);
    expect(result).to.be.deep.equal({
      elegivel: false,
      razoesInelegibilidade: ["Consumo muito baixo para tipo de conexão"],
    });
  });
});
