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
      <app-gestion-movimientos></app-gestion-movimientos>
    </section>
  `,
  styles: [],
})
export class MovimientosComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'GES_MOV';
    this.tag = [
      {
        id: 1,
        codigo: 'GES_MOV',
        nombreTag: 'Gestión de movimientos',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
