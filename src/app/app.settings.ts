/*
 *    Configurações globais da aplicação
 */
export class AppSettings {
  public static get API_ENDPOINT(): string {
    return "/api/";
  }

  public static get FORM_ENDPOINT(): string {
    return "/static/";
  }

  public static get API_REPORTS(): string {
    return "reports/";
  }
}
