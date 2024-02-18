import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-proveedores',
  template: `
    <app-sub-navbar
      [tagActivo]="tabActivo"
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>
    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'GES_PRO'">
          <app-gestion-proveedores
            (ceacionDeInventario)="recibirEmitCreacionInventario($event)"
          ></app-gestion-proveedores>
        </div>
        <div *ngSwitchCase="'CRE_PRO'">
          <app-creacion-proveedores></app-creacion-proveedores>
        </div>
        <div *ngSwitchCase="'CRE_INV'">
          <app-agregar-inventario></app-agregar-inventario>
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
  tabActivo: number = 1;
  agregarPestaña: boolean = false;

  constructor() {
    this.codigoTagActive = 'GES_PRO';
    this.tag = [
      {
        id: 1,
        codigo: 'GES_PRO',
        nombreTag: 'Gestión de proveedores',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 2,
        codigo: 'CRE_PRO',
        nombreTag: 'Creación de proveedores',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 3,
        codigo: 'CRE_INV',
        nombreTag: 'Creación de inventario',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }

  recibirEmitCreacionInventario(event: any) {
    this.codigoTagActive = 'CRE_INV';
    this.tabActivo = 4;
  }
}
