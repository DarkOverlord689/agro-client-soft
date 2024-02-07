import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-ventas',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>

    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'DAS_VEN'">
          <app-dashboard-ventas></app-dashboard-ventas>
        </div>
        <div *ngSwitchCase="'GES_VEN'">
          <app-gestion-ventas></app-gestion-ventas>
        </div>
        <div *ngSwitchCase="'DET_VEN'">
          <app-resumen-ventas></app-resumen-ventas>
        </div>
        <div *ngSwitchCase="'ACT_VEN'">
          <app-compra-actual-ventas></app-compra-actual-ventas>
        </div>
        <div *ngSwitchDefault></div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class VentasComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'DAS_VEN';
    this.tag = [
      {
        id: 2,
        codigo: 'DAS_VEN',
        nombreTag: 'Dashboard de ventas',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 1,
        codigo: 'GES_VEN',
        nombreTag: 'Gestión de ventas',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 3,
        codigo: 'DET_VEN',
        nombreTag: 'Resumen de ventas',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 4,
        codigo: 'ACT_VEN',
        nombreTag: 'Venta actual',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
