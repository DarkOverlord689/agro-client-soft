import { Component } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-productos',
  template: `
    <app-sub-navbar
      [tag]="tag"
      (emitTag)="recibirEmit($event)"
    ></app-sub-navbar>
    <section>
      <ng-container [ngSwitch]="codigoTagActive">
        <div *ngSwitchCase="'GEST_PRO'">
          <app-gestion-productos></app-gestion-productos>
        </div>
        <div *ngSwitchDefault></div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class ProductosComponent {
  tag: ITag[];
  codigoTagActive: string;

  constructor() {
    this.codigoTagActive = 'GEST_PRO';
    this.tag = [
      {
        id: 1,
        codigo: 'GEST_PRO',
        nombreTag: 'Gestión de productos',
        iconTag: '../../../../assets/icons/tags/suspensivo.svg',
      }
    ];
  }

  // EVENT
  recibirEmit(event: any) {
    this.codigoTagActive = event;
  }
}
