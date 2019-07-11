import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICache } from "./ICache";
import { DateUtil } from "../util/date.util";

/**
 * Serviço de cache de requisições HTTP
 *
 * Armazena o resultado das requisições HTTP GET em um cache para reaproveitar
 * nas próximas requisições. Por segurança o cache expira automaticamente após um tempo
 */
@Injectable()
export class CacheService {

  private prefixoChave = "cache\\";
  private separadorChave = "\\";
  private defaultExpiraEm = 3600; // cache expira por default em 1 hora

  constructor() {
    this.clear();
  }

  /**
   * Usa o cache ou busca o valor de um observable
   *
   * Caso a chave não existe no cache o resultado do observable é armazenado no cache e retornado
   *
   * Opcionalmente pode ser fornecido um id que será concatenado à chave
   *
   */
  public observable(chave: string, observable: Observable<any>, id?: number): Observable<any> {
    // Cria uma id de chave unica
    let idchave = this.prefixoChave + chave + this.separadorChave;
    if (typeof id !== "undefined") {
      idchave = idchave + this.separadorChave + id + this.separadorChave;
    }
    return this.getItem(idchave)
    // Busca o valor do cache e verifica se está expirado
      .map((valor: ICache) => {
        if (valor) { // se o cache expirou considera o valor como null
          if (DateUtil.now().getTime() > valor.expiraEm) { // valor válido no cache
            this.removeItem(idchave);
            return null;
          }
        }
        return valor;
      })
      
  }

  // Seta um valor que expira no cache local
  private cache(chave: string, valor: string): Observable<ICache> {
    const icache: ICache = {
      expiraEm: DateUtil.plusSeconds(this.defaultExpiraEm).getTime(),
      valor: valor
    };
    return this.setItem(chave, icache);
  }

  // Seta um valor do tipo ICache no cache local
  private setItem(chave: string, icache: ICache): Observable<ICache> {
    if (typeof chave !== "string") {
      chave = String(chave);
      console.warn(`${chave} usado como chave não é um string`);
    }
    if (icache === undefined) {
      icache = null;
    }
    return icache.valor;
  }

  // Retorna um valor do tipo ICache do cache local
  private getItem(chave: string): Observable<ICache> {
    const icache = localStorage.getItem(chave);
    return JSON.parse(icache);
  }

  // Remove um item do cache local
  private removeItem(chave: string): void {
    localStorage.removeItem(chave);
  }

  /**
   * Limpa o cache
   */
  public clear(): void {
    // Remove todas as entradas do cache
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const chave = localStorage.key(i);
      if (chave.indexOf(this.prefixoChave) === 0) {
        localStorage.removeItem(chave);
      }
    }
  }

 

}
