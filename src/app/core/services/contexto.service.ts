import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { AutenticacaoService } from "./autenticacao.service";

/**
 * Serviço que mantém o contexto da aplicação
 *
 * O método save é invocado após o login da app salvando as informações do
 * servidor (modulos, funcionalidades, propriedades, etc)
 *
 */
@Injectable()
export class ContextoService {

  constructor(private router: Router) {
  }

  /**
   * Grava o contexto recebido no login
   */
  public save(usuario, filial, modulos, propriedades) {
    
  }

  /**
   * Navega até a home.
   */
  public navigateToHome(): void {
    this.router.navigate(["/home"]);     
  }

}
