import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-pedidos',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>
  `,
  styles: [
  ]
})
export class PedidosComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'CRE_TAR';
    this.tag = [
      {
        id: 1,
        codigo: 'CRE_TAR',
        nombreTag: 'Gestión de tareas',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 2,
        codigo: 'TAB_TAR',
        nombreTag: 'Panel de tareas',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 3,
        codigo: 'VIS_TAR',
        nombreTag: 'Tablero de tareas',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 4,
        codigo: 'CAL_TAR',
        nombreTag: 'Calendario de tareas',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 5,
        codigo: 'EVI_PRO',
        nombreTag: 'Evidencia proyectos',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
