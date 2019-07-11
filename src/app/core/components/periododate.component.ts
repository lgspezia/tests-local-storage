import { Component, Input, OnInit } from "@angular/core";

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "it-periododate",
  templateUrl: "it-periododate.component.html",
})
export class TimeDateComponent implements OnInit {
  @Input() public labelPeriodoInicial: string;
  @Input() public labelPeriodoFinal: string;
  @Input() public showTime: boolean;

  constructor() {
    
    this.showTime = false;
  }

  public ngOnInit(): void {
    if (!this.labelPeriodoInicial) {
      this.labelPeriodoInicial = this.showTime ? "Data e hora inicial" : "Data inicial";
    }
    if (!this.labelPeriodoFinal) {
      this.labelPeriodoFinal = this.showTime ? "Data e hora final" : "Data final";
    }
  }
}
