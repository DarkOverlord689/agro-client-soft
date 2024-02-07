import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-inventario',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>
    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'DAS_INV'">
          <app-dashboard-inventario></app-dashboard-inventario>
        </div>
        <div *ngSwitchCase="'GES_INV'">
          <app-gestion-inventario></app-gestion-inventario>
        </div>
        <div *ngSwitchDefault></div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class InventarioComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'DAS_INV';
    this.tag = [
      {
        id: 1,
        codigo: 'DAS_INV',
        nombreTag: 'Dashboard de inventario',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 2,
        codigo: 'GES_INV',
        nombreTag: 'Gestión de inventario',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      }
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
