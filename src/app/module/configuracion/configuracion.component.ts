import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-configuracion',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>
    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'GES_USU'">
          <app-usuarios></app-usuarios>
        </div>
        <div *ngSwitchCase="'GES_BAN'">
          <app-bancos></app-bancos>
        </div>
        <div *ngSwitchCase="'GES_CAT'">
          <app-categoria></app-categoria>
        </div>
        <div *ngSwitchCase="'GES_TIP'">
          <app-tipos></app-tipos>
        </div>
        <div *ngSwitchDefault></div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class ConfiguracionComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'GES_USU';
    this.tag = [
      {
        id: 1,
        codigo: 'GES_USU',
        nombreTag: 'Gestión de usuarios',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 2,
        codigo: 'GES_BAN',
        nombreTag: 'Gestión de bancos',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 3,
        codigo: 'GES_CAT',
        nombreTag: 'Gestión de categorias',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
      {
        id: 4,
        codigo: 'GES_TIP',
        nombreTag: 'Gestión de tipos',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
