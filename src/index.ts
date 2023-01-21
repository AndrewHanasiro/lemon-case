import { analyze } from "./analysis";
// import { Analysis } from "./analysis_class";
import { validateSchema } from "./validators";

export function main(input: any) {
  validateSchema(input);
  return analyze(input);
  // const runner = new Analysis(input);
  // return runner.run();
}

const input = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
  ],
};

const result = main(input);
console.log(result);
