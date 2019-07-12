import { Injectable } from "@angular/core";
import {
  Headers,
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  ResponseContentType,
  URLSearchParams
} from "@angular/http";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

// import "rxjs/add/observable/throw";
// import "rxjs/add/operator/catch";
// import "rxjs/add/operator/map";
import { Observable } from "rxjs";

import { CacheService } from "./cache.service";
import { AppSettings } from "../../app.settings";
import { ServerError } from "../model/server-error";

@Injectable()
export class HttpService {

  protected headers: Headers;
  private whathever$: Observable<any>;

  private static json(response: Response): any {
    return response.arrayBuffer().byteLength > 0 || response.text() === "" ? response : response.json();
  }

  constructor(private http: Http, private router: Router, private sanitizer: DomSanitizer, private cacheService: CacheService) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
  }

  /**
   * GET
   */
  public get(url: string, args?: RequestOptionsArgs): Observable<any> {
    // return this.http.get(`${AppSettings.API_ENDPOINT}${url}`, args)
    //   .map((response: Response) => response.json())
    //   .catch((error) => this.handleError(error, this.router))
return this.whathever$;
  }

  /**
   * GET com funcionalidade de cache
   */
  public getCache(url: string, args?: RequestOptionsArgs): Observable<any> {
    let http$: Observable<any>;
    // const http$: Observable<any> = this.http.get(`${AppSettings.API_ENDPOINT}${url}`, args)
    //   .map((response: Response) => response.json())
    //   .catch((error) => this.handleError(error, this.router));

    if (args) {
      (<URLSearchParams> args.search)
        .paramsMap
        .forEach((value, key) => url = `${url}${url.indexOf("?") === -1 ? `?` : `&`}${key}=${value.join(",")}`);
    }

    return this.cacheService.observable(url, http$);
  }

  /**
   * Busca o objeto por id.
   */
  public getById(url: string, id: number): Observable<any> {
    
    // return this.http.get(`${AppSettings.API_ENDPOINT}${url}/${id}`)
    //   .map((response: Response) => response.json())
    //   .catch((error) => this.handleError(error, this.router));
    let http$: Observable<any>;
    return http$;
  }

  /**
   * Busca o objeto por codigo.
   */
  public getByCode(url: string, code: string): Observable<any> {
    // return this.http.get(`${AppSettings.API_ENDPOINT}${url}/code/${code}`)
    //   .map((response: Response) => response.json())
    //   .catch((error) => this.handleError(error, this.router));
    let http$: Observable<any>;
    return http$;
  }

  /**
   * POST com conversão automática dos dados para JSON. Sempre deve retorna um id.
   */
  public post(url: string, data: any, args?: RequestOptionsArgs): Observable<any> {
    if (args == null) {
      args = {};
    }
    if (args.headers === undefined) {
      args.headers = this.headers;
    }
    // return this.http.post(`${AppSettings.API_ENDPOINT}${url}`, JSON.stringify(data), args)
    //   .map((response: Response) => response.json())
    //   .catch((error) => this.handleError(error, this.router));
    let http$: Observable<any>;
    return http$;
  }

  



  public put(url: string, data: any, args?: RequestOptionsArgs): Observable<any> {
    if (args == null) {
      args = {};
    }
    if (args.headers === undefined) {
      args.headers = this.headers;
    }
    // return this.http.put(`${AppSettings.API_ENDPOINT}${url}`, JSON.stringify(data), args)
    //   .map((response: Response) => HttpService.json(response))
    //   .catch((error) => this.handleError(error, this.router));
    let http$: Observable<any>;
    return http$;
  }

  public delete(url: string, id: number, args?: RequestOptionsArgs): Observable<any> {
    if (args == null) {
      args = {};
    }
    if (args.headers === undefined) {
      args.headers = this.headers;
    }
    // return this.http.delete(`${AppSettings.API_ENDPOINT}${url}/${id}`, args)
    //   .map((response: Response) => HttpService.json(response))
    //   .catch((error) => this.handleError(error, this.router));
    let http$: Observable<any>;
    return http$;
  }

  public redirect() {
    localStorage.removeItem("usuario");
    this.router.navigate(["login"]).catch(() => {
      throw new Error("Não foi possível redirecionar para Login");
    });
  }

  /**
   * Trata o erro e faz um throw de um objeto conhecido ServerError
   */
  private handleError(error: any, router: Router) {
    // Primeiro trata pelo erro recebido no formato json (se existir)
    let errorJson = null;

    if (!error.message) {
      errorJson = error.json();
    }

    switch (errorJson.httpStatus) {
      case 401:
        return Observable.throw(new ServerError(401, "401", "Não autorizado"));
      case 403:
      case 422:
      case 500:
        return Observable.throw(
          new ServerError(errorJson.httpStatus, errorJson.codigoErro, errorJson.mensagem));
      default:
        // Agora trata pelo erro do http response diretamente
        return Observable.throw(new ServerError(999, "999", "Erro indefinido"));
    }
  }

}
