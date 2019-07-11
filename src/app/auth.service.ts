import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AutenticacaoService } from './core/services/autenticacao.service';

interface myData {
  success: boolean,
  message: string
}

@Injectable()
export class AuthService {

  private loggedInStatus = false

  constructor(private http: HttpClient, private logStatus: AutenticacaoService) { }
  

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getUserDetails(username, password) {
    // post these details to API server return user info if correct
    return this.http.post<myData>('../../test/api/auth.php', {
      username,
      password
    })
  }

  public userDetail(username, password) {
    this.logStatus.login(username, password);
  }

  /**
   * Recupera os dados do localstorage.
   */
  public get userDetails() {
    return this.logStatus.usuario();
  }

  /**
   * Grava dados usuario no localstorage.
   * @param resp
   */
  public set userDetails(resp: any) {
    this.logStatus.usuario(resp);
    
  }


}
