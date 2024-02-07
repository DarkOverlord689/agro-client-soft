import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-proveedores',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>
    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'DAS_PRO'">
          <app-dashboard-proveedores></app-dashboard-proveedores>
        </div>
        <div *ngSwitchCase="'GES_PRO'">
          <app-gestion-proveedores></app-gestion-proveedores>
        </div>
        <div *ngSwitchCase="'CRE_PRO'">
          <app-creacion-proveedores></app-creacion-proveedores>
        </div>
        <div *ngSwitchDefault></div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class ProveedoresComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'DAS_PRO';
    this.tag = [
      {
        id: 1,
        codigo: 'DAS_PRO',
        nombreTag: 'Dashboard de proveedores',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 2,
        codigo: 'GES_PRO',
        nombreTag: 'Gestión de proveedores',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 3,
        codigo: 'CRE_PRO',
        nombreTag: 'Creación de proveedores',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
