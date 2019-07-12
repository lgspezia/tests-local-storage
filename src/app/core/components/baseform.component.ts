import { Input, OnDestroy } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subscription } from "rxjs";
import { Observable } from "rxjs";

import { ServerError } from "../model/server-error";
import { Modo } from "../model/modo.enum";


/**
 * Classe base para todos os componentes, por default implementa OnDestroy
 * para efetuar unsubscribe nos subscriptions adicionados.
 */
export class BaseFormComponent implements OnDestroy {

  @Input() public form$: BehaviorSubject<FormGroup>;
  @Input() public control: string;
  @Input() public label: string;
  @Input() public col = 3;

  private subscription: Subscription;

  constructor() {
    this.subscription = new Subscription();

  }

  /**
   * Destroy o subscribe.
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Tratamento de erros padrão do componente
   * @param error: ServerError
   */
  public handleError(error: ServerError): void {
 
  }


  /**
   * Seta o valor de um campo do form.
   * * @param value
   * @param control:? string
   */
  // public setValue(value: any, control: string = this.control): void {
  //   this.addSubscription(this.getControl(control).subscribe((ac) => ac.setValue(value)));
  // }

  /**
   * Retorna um observable de valor do componente.
   * @param control:? string
   * @return {Observable<any>}
   */
  // public getValue(control: string = this.control): Observable<any> {
  //   return this.getControl(control).map((ac: AbstractControl) => ac.value);
  // }

  /**
   * Retorna o Observable do component.
   *
   * @param control: string
   * @param form$: {@link BehaviorSubject<FormGroup>} não é necessário especificar o form,
   * pois ele esta dentro da classe. Porém as vezes estamos trabalhando com mais de um form.
   * @return {Observable<any>}
   */
  public getValueChanges(control: string = this.control, form$: BehaviorSubject<FormGroup> = this.form$): Observable<any> {
    const abControl: AbstractControl = form$.getValue().get(control);
    if (!abControl) {
      throw new Error("Campo não existe: " + control);
    }
    return abControl.valueChanges;
  }

 
 /**
   * Mapeia o control desejado, validando se existe.
   * @param control:? string
   */
  // public getControl(control: string = this.control, form$: BehaviorSubject<FormGroup> = this.form$): Observable<FormGroup> {
    public getControl(control: string = this.control, form$: BehaviorSubject<FormGroup> = this.form$): void {

    // return form$.map((fg: FormGroup) => {
    //   const abControl = fg.get(control);
    //   if (!abControl) {
    //     throw new Error("Campo não existe: " + control);
    //   }
    //   return abControl;
    // });

    //return Observable.of(this.control); //
  }
 

  /**
   * Adiciona o subscription para executar unsubscribe no OnDestroy.
   * @param subscription
   */
  public addSubscription(subscription: Subscription) {
    this.subscription.add(subscription);
  }

}
