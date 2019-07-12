import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from './core/services/autenticacao.service';

interface myData {
  message: string,
  success: boolean
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}
@Injectable()
export class UserService {


  constructor(private http: HttpClient, private logStatus: AutenticacaoService) { }

  getSomeData() {
    //return this.http.get<myData>('/api/database.php')
    return this.http.get<myData>(JSON.parse(localStorage.getItem("username")))
  }

  setSomeData(username: string, pass: string) {
    //return this.http.get<myData>('/api/database.php')
    // this.http. get<myData>();
    const itemPost = localStorage.setItem("username", JSON.stringify(username));
    this.http.post<myData>("username", itemPost);
  }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin.php')    
  }

  logout() {
    return this.http.get<logoutStatus>('/api/logout.php')
  }

  /**
   * Recupera os dados do localstorage.
   */
  public get userData() {
    return this.logStatus.usuario();
  }


  /** Exemplos */
  /*public gravarLocalStorage() {
    let nome: string = "John";
    let pessoa = { nome: "Joao", idade: 12, coord: { lat: 10, lng: -10 } }
    localStorage.setItem("nome" , nome);
    localStorage.setItem("pessoa", JSON.stringify(pessoa));
  }

  public getLocalStorage() {
    if (localStorage.getItem("nome")) {
      let nome = localStorage.getItem("nome");
      let pessoa = JSON.parse(localStorage.getItem("pessoa"));
    } else {
      console.info("Não encontramos entradas solicitadas");
    }
  }*/

}
