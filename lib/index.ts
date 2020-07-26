import { validators } from "./validators";
import { SimpleValidation, LengthValidation } from "./types";

export interface FormulaConfig {
  id?: string;
  validateOn?: "pristine" | "change" | "blur";
  fields: FormulaField[];
}

export interface FormulaField {
  name: string;
  validations: string[] | ((v: any) => boolean);
}

interface FieldDictionary {
  field: HTMLElement;
  dirty: boolean;
}

export class Formula {
  private fieldsDictionary: { [key: string]: FieldDictionary } = {};

  constructor(config: FormulaConfig) {
    this.setFields(config);
  }

  /**
   * Sets fields objects
   * @param config: FormulaConfig
   */
  private setFields(config: FormulaConfig) {
    config.fields.forEach(f => {
      const el = document.getElementsByName(f.name);
      if (el.length) {
        const validateOn =
          config.validateOn !== "pristine"
            ? `on${config.validateOn}`
            : "onblur";

        const validations = this.setValidations(f.validations);

        (el[0] as { [key: string]: any })[validateOn] = () =>
          this.runValidations(validations, (el[0] as HTMLInputElement).value);

        this.fieldsDictionary[f.name] = { field: el[0], dirty: false };
      }
    });
  }

  private setValidations(
    validations: string[] | ((v: any) => boolean)
  ): SimpleValidation[] | ((v: any) => boolean) {
    if (Array.isArray(validations)) {
      return validations.map(v => {
        return v.includes("length")
          ? (validators[v] as LengthValidation)(+v.split(":")[1])
          : (validators[v] as SimpleValidation);
      });
    }

    return validations;
  }

  private runValidations(
    validations: SimpleValidation[] | ((v: any) => boolean),
    value: string
  ) {
    if (Array.isArray(validations)) {
      for (let i = 0; i < validations.length; i++) {
        const valid = validations[i](value);
        // Que hago despues de correr validaciones
        // (modificar prop, como retorno?)
        if (!valid) {
          break;
        }
      }
    }
  }
}
