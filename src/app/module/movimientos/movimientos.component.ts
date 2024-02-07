import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-movimientos',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>
    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'DAS_MOV'">
          <app-dashboard-movimientos></app-dashboard-movimientos>
        </div>
        <div *ngSwitchCase="'GES_MOV'">
          <app-gestion-movimientos></app-gestion-movimientos>
        </div>
        <div *ngSwitchDefault></div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class MovimientosComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'DAS_MOV';
    this.tag = [
      {
        id: 1,
        codigo: 'DAS_MOV',
        nombreTag: 'Dashboard de movimientos',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 2,
        codigo: 'GES_MOV',
        nombreTag: 'Gestión de movimientos',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      }
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
