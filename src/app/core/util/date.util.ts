
/**
 * Created on 07/07/19.
 */
export class DateUtil {

  /**
   * Retorna a data atual.
   * @return {Date}
   */
  public static today(): Date {
    // tslint:disable-next-line:no-new-date
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * Retorna a data e hora atual.
   * @return {Date}
   */
  public static now(): Date {
    // tslint:disable-next-line:no-new-date
    const date = new Date();
    date.setSeconds(0, 0);
    return date;
  }

  /**
   * Retorna a primeira data do mes atual
   *
   * @return {Date}
   */
  public static startOfMonth(): Date {
    const date: Date = DateUtil.today();
    date.setDate(1);
    return date;
  }

  /**
   * Retorna a última data do mês atual.
   *
   * @return {Date}
   */
  public static endOfMonth(): Date {
    const date: Date = DateUtil.today();
    const month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    return date;
  }

  /**
   * Primeira data da semana.
   * @return {Date}
   */
  public static startDayOfWeek(): Date {
    const date: Date = DateUtil.today();
    const day = date.getDay();
    if (day === 0) {
      return date;
    }

    return this.minusDays(day, date);
  }

  /**
   * Última data da semana.
   * @return {Date}
   */
  public static endDayOfWeek(): Date {
    const date: Date = DateUtil.startDayOfWeek();
    return this.plusDay(6, date);
  }

  /**
   * Adiciona dias a data.
   *
   * @param days
   * @return {Date}
   */
  public static plusDay(days: number, date: Date = this.today()): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  /**
   * Subtrai dias a data.
   *
   * @param days
   * @return {Date}
   */
  public static minusDays(days: number, date: Date = this.today()): Date {
    date.setDate(date.getDate() - days);
    return date;
  }

  /**
   * Adiciona segundos a data e hora atual
   * @param seconds
   * @returns {Date}
   */
  public static plusSeconds(seconds: number): Date {
    // tslint:disable-next-line:no-new-date
    const agora: Date = new Date();
    // tslint:disable-next-line:no-new-date
    return new Date(agora.getTime() + (seconds * 1000));
  }

  /**
   * Determina se a data é igual a data de hoje.
   *
   * @param date: Date
   * @return {boolean}
   */
  public static isToday(date: Date): boolean {
    const hoje: Date = DateUtil.today();
    return DateUtil.isEqual(date, hoje);
  }

  /**
   * Determina se as datas são iguais.
   *
   * @param date1
   * @param date2
   * @return {boolean}
   */
  public static isEqual(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
  }

  /**
   * Verifica se a primeira data é posterior que a segunda data
   *
   * @param date1
   * @param date2
   * @return {boolean}
   */
  public static isAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
  }

  /**
   * Verifica se a primeira data é anterior que a segunda data
   *
   * @param date1
   * @param date2
   * @return {boolean}
   */
  public static isBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
  }

  /**
   * Parse de string para Date.
   * @param {string} value
   * @return {Date}
   */
  public static parse(value: string): Date {
    /*
     * Se veio com horas apenas cria uma nova data.
     */
    if (value.indexOf(":") !== -1) {
      // tslint:disable-next-line:no-new-date
      return DateUtil.convertUTCDateToLocalDate(new Date(value));
    } else {
      /*
       * Nesse caso preciso determinada a hora 00:00.
       */
      // tslint:disable-next-line:no-new-date
      return new Date(`${value} 00:00:00`);
    }
  }

  /**
   * Converte para o formato UTC.
   * @param date Date
   * @return {Date}
   */
  public static convertUTCDateToLocalDate(date) {
    // tslint:disable-next-line:no-new-date
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return newDate;
  }

}
