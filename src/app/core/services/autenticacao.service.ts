import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { Subscription } from "rxjs";

import { CacheService } from "./cache.service";
import { ContextoService } from "./contexto.service";
import { HttpService } from "./http.service";


/**
 * Serviço de autenticação de usuarios
 */
@Injectable()
export class AutenticacaoService {

  constructor(private contextoService: ContextoService, private httpService: HttpService,
              private cacheService: CacheService,
              private router: Router) {
  }

  /**
   * Login no servidor
   */
  public login(usuario: string, senha: string) {
    const body = "j_username=" + encodeURIComponent(usuario) +
      "&j_password=" + encodeURIComponent(senha) +
      "&remember-me=true" +
      "&submit=Login";
    // HttpService é invocado com um header específico para o Spring Security
    const headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
    const options = new RequestOptions({headers});
    return this.httpService;  //.postRaw("authentication", body, options);
  }

  /**
   * Executa o logout do sistema
   */
  public doLogout() {
    localStorage.removeItem("username");
    this.cacheService.clear();
    //this.httpService.postRaw("logout", "").subscribe((response) => this.httpService.redirect());
    this.httpService.redirect();
  }

  /**
   * Verifica se existe um usuario logado no sistema
   */
  public get isLogado(): boolean {
    return !!this.usuario;
  }

  /**
   * Grava dados usuario no localstorage.
   * @param resp
   */
  public set usuario(resp: any) {
    localStorage.setItem("username", JSON.stringify(resp));
  }

  /**
   * Recupera os dados do localstorage.
   */
  public get usuario() {
    return JSON.parse(localStorage.getItem("username"));
  }

}
