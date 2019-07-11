
import { isNullOrUndefined } from "util";

/**
 * Validações de números.
 *
 */
export class NumberUtil {


  public static numberNullOrZero(value: number): boolean {
    return isNullOrUndefined(value) || value === 0;
  }

  public static parseInt(value: string): number {
    if (isNullOrUndefined(value)) {
      return 0;
    }
    return Number.parseInt(value);
  }

  public static parseFloat(value: string): number {
    if (isNullOrUndefined(value)) {
      return 0;
    }
    return Number.parseFloat(value);
  }

  public static apenasNumeros(string: string): string {
    if (string == null) {
      return "";
    }
    let retorno = "";
    for (let i = 0; i < string.length; i++) {
      if ("0123456789".indexOf(string.substring(i, i + 1)) !== -1) {
        retorno += string.substring(i, i + 1);
      }
    }
    return retorno;
  }
}

/**
 * Regex que permite informar apenas números.
 * @type {string}
 */
export const REGEX_NUMBER = "[0-9]*$";
