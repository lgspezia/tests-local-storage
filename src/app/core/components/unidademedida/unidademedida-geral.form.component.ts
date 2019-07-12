import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";

import { IDataItem } from "../../model/dataitem";
import { FormComponent } from "../form.component";

/**
 * Unidades de medida.
 *
 */
@Component({
  selector: "unidademedida-geral",
  templateUrl: "unidademedida-geral.form.html",
})
export class ItUnidadeMedidaGeralFormComponent extends FormComponent implements OnInit {

  public max$: Observable<number>;
  public tipo$: Observable<IDataItem[]>;

  constructor(protected activatedRoute: ActivatedRoute, protected formBuilder: FormBuilder) {
    super(activatedRoute);

    // this.max$ = Observable.of(6);
  }

  public ngOnInit(): void {
    // this.subscription.add(this.getControl("codigo")
    //   .subscribe((c: AbstractControl) => {
    //     c.setValidators([Validators.required, Validators.maxLength(6)]);
    //     c.setAsyncValidators([uniqueAsyncValidator("unidades-medida")]);
    //   }));

    // this.subscription.add(this.getControl("nome")
    //   .subscribe((c: AbstractControl) => c.setValidators([Validators.required, Validators.maxLength(50)])));

    //   this.subscription.add(this.getControl("casasdecimais")
    //   .subscribe((c: AbstractControl) => c.setValidators([Validators.maxLength(6)])));
  }

}
