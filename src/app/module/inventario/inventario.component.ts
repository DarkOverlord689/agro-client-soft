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
      <app-gestion-inventario></app-gestion-inventario>
    </section>
  `,
  styles: [],
})
export class InventarioComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'GES_INV';
    this.tag = [
      {
        id: 1,
        codigo: 'GES_INV',
        nombreTag: 'Gestión de inventario',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
