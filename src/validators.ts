import { inputSchema } from "./json-schema";

export function validateSchema(input: any) {
  if (typeof input != inputSchema.type) {
    throw new Error("type of input is not object");
  }
  const inputAttrList = Object.keys(input);
  for (let i = 0; i < inputAttrList.length; i++) {
    const attr = inputAttrList[i];
    const indexOfAttr = inputSchema.required.indexOf(attr);
    if (indexOfAttr == -1) {
      throw new Error("attributes not following schema, is missing");
    }
    //Didn't find a way to make this dynamic
    switch (attr) {
      case "numeroDoDocumento": {
        validateNumeroDoDocumento(input[attr]);
        break;
      }
      case "tipoDeConexao": {
        validateTipoDeConexao(input[attr]);
        break;
      }
      case "classeDeConsumo": {
        validateClasseDeConsumo(input[attr]);
        break;
      }
      case "modalidadeTarifaria": {
        validateModalidadeTarifaria(input[attr]);
        break;
      }
      case "historicoDeConsumo": {
        validateHistoricoDeConsumo(input[attr]);
        break;
      }
      default:
        throw new Error(
          "attributes not following schema, has more than necessary"
        );
    }
  }
}

export function validateNumeroDoDocumento(input: unknown) {
  const possibilties = inputSchema.properties.numeroDoDocumento.oneOf;
  let countFails = 0;
  for (let i = 0; i < possibilties.length; i++) {
    try {
      if (!validateType(possibilties[i].type, input)) {
        throw new Error("numeroDoDocumento isn't string");
      }
      const regex = RegExp(possibilties[i].pattern);

      if (!regex.test(input as string)) {
        throw new Error("numeroDoDocumento doesn't have pattern right");
      }
    } catch (error) {
      countFails++;
    }
  }
  if (possibilties.length - countFails < 1) {
    throw new Error("numeroDoDocumento hasn't fit any pattern");
  }
  if (possibilties.length - countFails > 1) {
    throw new Error("numeroDoDocumento has fit in 2 or more pattern");
  }
}

export function validateTipoDeConexao(input: unknown) {
  const validator = inputSchema.properties.tipoDeConexao;
  if (!validateType(validator.type, input)) {
    throw new Error("validateTipoDeConexao has type diff of enum expected");
  }
  if (!validator.enum.includes(input)) {
    throw new Error("validateTipoDeConexao was any of enum expected");
  }
}

export function validateClasseDeConsumo(input: unknown) {
  const validator = inputSchema.properties.classeDeConsumo;
  if (typeof input !== validator.type) {
    throw new Error("classeDeConsumo has type diff of enum expected");
  }
  if (!validator.enum.includes(input)) {
    throw new Error("classeDeConsumo was any of enum expected");
  }
}

export function validateModalidadeTarifaria(input: unknown) {
  const validator = inputSchema.properties.modalidadeTarifaria;
  if (typeof input !== validator.type) {
    throw new Error("modalidadeTarifaria has type diff of enum expected");
  }
  if (!validator.enum.includes(input)) {
    throw new Error("modalidadeTarifaria was any of enum expected");
  }
}

export function validateHistoricoDeConsumo(input: unknown) {
  if (!(input instanceof Array)) {
    // In JS typeof [1,2,3] is 'object', therefore this was hardcoded
    throw new Error("historicoDeConsumo should be array");
  }
  if (input.length < inputSchema.properties.historicoDeConsumo.minItems)
    throw new Error("historicoDeConsumo need more than 3");
  if (input.length > inputSchema.properties.historicoDeConsumo.maxItems)
    throw new Error("historicoDeConsumo need less than 12");
  for (let j = 0; j < input.length; j++) {
    const item = input[j];
    if (
      !validateType(inputSchema.properties.historicoDeConsumo.items.type, item)
    ) {
      throw new Error("historicoDeConsumo item should be a number");
    }
    let num = Number(item);
    if (!Number.isInteger(num)) {
      throw new Error("historicoDeConsumo item is not integer");
    }
    if (
      num < inputSchema.properties.historicoDeConsumo.items.minimum ||
      num > inputSchema.properties.historicoDeConsumo.items.maximum
    ) {
      throw new Error(
        "attributes not following schema, historicoDeConsumo item out of range"
      );
    }
  }
}

export function validateType(type: string, obj: unknown): boolean {
  switch (type) {
    case "string":
      return isString(obj);
    case "array":
      return isArray(obj);
    case "integer":
      return isInteger(obj);
    default:
      throw new Error("Type not mapped");
  }
}
function isString(obj: unknown): boolean {
  return typeof obj === "string";
}
function isArray<T>(obj: unknown): boolean {
  return Array.isArray(obj);
}
function isInteger(obj: unknown): boolean {
  const num = Number(obj);
  if (!Number.isNaN(num)) {
    return Number.isInteger(num);
  }
  return false;
}
