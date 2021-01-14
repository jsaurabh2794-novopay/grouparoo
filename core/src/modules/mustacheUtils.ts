import Mustache from "mustache";

export namespace MustacheUtils {
  export interface MustacheArgs {
    [key: string]: any;
  }

  export function strictlyRender(
    string: string,
    data: MustacheArgs,
    errorPrefix?: string
  ) {
    validateMustacheVariables(string, data, errorPrefix);
    return render(string, data);
  }

  export function render(string: string, data: MustacheArgs) {
    return Mustache.render(string, data);
  }

  export function validateMustacheVariables(
    string: string,
    data: MustacheArgs,
    errorPrefix = "missing mustache key"
  ) {
    Mustache.parse(string)
      .filter((chunk) => chunk[0] === "name" || chunk[0] === "&")
      .map((chunk) => chunk[1])
      .map((key) => {
        const value = key.split(".").reduce((o, i) => o[i], data);
        if (value === undefined || value === null) {
          throw new Error(`${errorPrefix} "${key}"`);
        }
      });
  }
}