import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";

import { Subject } from "rxjs";
import { Subscription } from "rxjs";
import { Modo } from "../model/modo.enum";


@Component({
  selector: "form",
  templateUrl: "form.component.html",
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() public form$: BehaviorSubject<FormGroup>;
  @Input() public modo$: BehaviorSubject<Modo>;

  /**
   * Evento de submit.
   */
  @Input() public eventSubmit$: Subject<any>;
  /**
   * Determina se o botão cancelar esta visível.
   */
  @Input() public cancelVisible$: Observable<boolean>;


  /**
   * Define o texto do botão submit, por defaul é gravar.
   */
  @Input() public titleSubmit: string;

  /**
   * Emite evento de cancelamento.
   */
  @Output() public onCancel: EventEmitter<any>;

  public mensagemExclusao$: Observable<string>;

  private subscription: Subscription;

  constructor(protected activatedRoute: ActivatedRoute) {
    // this.cancelVisible$ = Observable.of(true);
    this.modo$ = new BehaviorSubject(undefined);
    this.onCancel = new EventEmitter();
    this.titleSubmit = "GRAVAR";
    // this.mensagemExclusao$ = Observable.of(`Confirma a exclusão do registro?`);
  }

  /**
   * Necessário para finalizar o observable do metodo OnInit.
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Captura os modos de visualizacao e exclusao desabilitando todos os campos - utilizado para informar ao usuário.
   */
  public ngOnInit(): void {
    // this.subscription = this.modo$
    //   .filter((modo: number) => modo === Modo.READ || modo === Modo.DELETE)
    //   .switchMap(() => this.form$)
    //   .subscribe((form: FormGroup) => Object.keys(form.controls).forEach((key: any) => form.get(key).disable()));

  }


  public eventCancel(): void {
    this.onCancel.emit(null);
  }
}
