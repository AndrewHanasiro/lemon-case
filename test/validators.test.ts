import {
  validateClasseDeConsumo,
  validateHistoricoDeConsumo,
  validateModalidadeTarifaria,
  validateNumeroDoDocumento,
  validateSchema,
  validateTipoDeConexao,
  validateType,
} from "../src/validators";
import { expect } from "chai";

function isError(obj: unknown): obj is Error {
  return (obj as Error).message !== undefined;
}

describe("Validators", function () {
  it("should succeed", () => {
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: [
        3878, // mes atual
        9760, // mes anterior
        5976, // 2 meses atras
        2797, // 3 meses atras
        2481, // 4 meses atras
        5731, // 5 meses atras
        7538, // 6 meses atras
        4392, // 7 meses atras
        7859, // 8 meses atras
        4160, // 9 meses atras
        6941, // 10 meses atras
        4597, // 11 meses atras
      ],
    };
    expect(validateSchema(input)).to.be.equal(void 0);
  });

  describe("validateClasseDeConsumo", () => {
    it("should succeed when CPF", () => {
      expect(validateNumeroDoDocumento("14041737706")).to.be.equal(void 0);
    });
    it("should succeed when CNPJ", () => {
      expect(validateNumeroDoDocumento("84215534000125")).to.be.equal(void 0);
    });
    it("should fail when number", () => {
      try {
        validateNumeroDoDocumento(84215534000125);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "numeroDoDocumento hasn't fit any pattern"
          );
      }
    });
    it("should fail when string but not match any pattern", () => {
      try {
        validateNumeroDoDocumento("ab041737706");
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "numeroDoDocumento hasn't fit any pattern"
          );
      }
    });
  });

  describe("validateTipoDeConexao", () => {
    it("should succeed when monofasico", () => {
      expect(validateTipoDeConexao("monofasico")).to.be.equal(void 0);
    });
    it("should succeed when bifasico", () => {
      expect(validateTipoDeConexao("bifasico")).to.be.equal(void 0);
    });
    it("should succeed when trifasico", () => {
      expect(validateTipoDeConexao("trifasico")).to.be.equal(void 0);
    });
    it("should fail when number", () => {
      try {
        validateTipoDeConexao(12345);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "validateTipoDeConexao has type diff of enum expected"
          );
      }
    });
    it("should fail when string but not match any pattern", () => {
      try {
        validateTipoDeConexao("ab041737706");
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "validateTipoDeConexao was any of enum expected"
          );
      }
    });
  });

  describe("validateClasseDeConsumo", () => {
    it("should succeed when residencial", () => {
      expect(validateClasseDeConsumo("residencial")).to.be.equal(void 0);
    });
    it("should succeed when industrial", () => {
      expect(validateClasseDeConsumo("industrial")).to.be.equal(void 0);
    });
    it("should succeed when comercial", () => {
      expect(validateClasseDeConsumo("comercial")).to.be.equal(void 0);
    });
    it("should succeed when rural", () => {
      expect(validateClasseDeConsumo("rural")).to.be.equal(void 0);
    });
    it("should succeed when poderPublico", () => {
      expect(validateClasseDeConsumo("poderPublico")).to.be.equal(void 0);
    });
    it("should fail when number", () => {
      try {
        validateClasseDeConsumo(12345);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "classeDeConsumo has type diff of enum expected"
          );
      }
    });
    it("should fail when string but not match any pattern", () => {
      try {
        validateClasseDeConsumo("ab041737706");
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "classeDeConsumo was any of enum expected"
          );
      }
    });
  });

  describe("validateModalidadeTarifaria", () => {
    it("should succeed when azul", () => {
      expect(validateModalidadeTarifaria("azul")).to.be.equal(void 0);
    });
    it("should succeed when branca", () => {
      expect(validateModalidadeTarifaria("branca")).to.be.equal(void 0);
    });
    it("should succeed when verde", () => {
      expect(validateModalidadeTarifaria("verde")).to.be.equal(void 0);
    });
    it("should succeed when convencional", () => {
      expect(validateModalidadeTarifaria("convencional")).to.be.equal(void 0);
    });
    it("should fail when number", () => {
      try {
        validateModalidadeTarifaria(12345);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "modalidadeTarifaria has type diff of enum expected"
          );
      }
    });
    it("should fail when string but not match any pattern", () => {
      try {
        validateModalidadeTarifaria("ab041737706");
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "modalidadeTarifaria was any of enum expected"
          );
      }
    });
  });

  describe("validateHistoricoDeConsumo", () => {
    it("should succeed when sending normal data", () => {
      expect(
        validateHistoricoDeConsumo([
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941,
          4597,
        ])
      ).to.be.equal(void 0);
    });
    it("should fail when seding string", () => {
      try {
        validateHistoricoDeConsumo("asdasdasdasd");
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "historicoDeConsumo should be array"
          );
      }
    });
    it("should fail when size is less than 3", () => {
      try {
        validateHistoricoDeConsumo([1, 2]);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "historicoDeConsumo need more than 3"
          );
      }
    });
    it("should fail when size is bigger than 12", () => {
      try {
        validateHistoricoDeConsumo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "historicoDeConsumo need less than 12"
          );
      }
    });
    it("should fail when item is not number", () => {
      try {
        validateHistoricoDeConsumo(["t1", "t2", "t3", "t4"]);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "historicoDeConsumo item should be a number"
          );
      }
    });
    it("should fail when item is lower than 0", () => {
      try {
        validateHistoricoDeConsumo([-1, 1, 2, 3]);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "attributes not following schema, historicoDeConsumo item out of range"
          );
      }
    });
    it("should fail when item is bigger than 9999", () => {
      try {
        validateHistoricoDeConsumo([100000, 1, 2, 3]);
      } catch (error) {
        if (isError(error))
          expect(error.message).to.be.equal(
            "attributes not following schema, historicoDeConsumo item out of range"
          );
      }
    });
  });

  describe("validateType", () => {
    it("should succeed validating string", () => {
      expect(validateType("string", "14041737706")).to.be.equal(true);
    });
    it("should succeed validating array", () => {
      expect(validateType("array", [])).to.be.equal(true);
    });
    it("should succeed validating integer", () => {
      expect(validateType("integer", 123)).to.be.equal(true);
    });
    it("should fail validating string", () => {
      expect(validateType("string", 123)).to.be.equal(false);
    });
    it("should fail validating array", () => {
      expect(validateType("array", "qweqw")).to.be.equal(false);
    });
    it("should fail validating integer", () => {
      expect(validateType("integer", [1, 2, 3])).to.be.equal(false);
    });
  });
});
