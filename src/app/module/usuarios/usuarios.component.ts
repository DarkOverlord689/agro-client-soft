import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-usuarios',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>

    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'GES_USU'">
          <app-gestion-usuarios></app-gestion-usuarios>
        </div>
        <div *ngSwitchCase="'CRE_USU'">
          <app-creacion-usuarios></app-creacion-usuarios>
        </div>
        <div *ngSwitchDefault></div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class UsuariosComponent {
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
        codigo: 'CRE_USU',
        nombreTag: 'Creación de usuarios',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      },
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
