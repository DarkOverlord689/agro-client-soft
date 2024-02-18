import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { GestionMovimientosComponent } from './gestion-movimientos/gestion-movimientos.component';
import { MovimientosComponent } from './movimientos.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GestionMovimientosComponent,
    MovimientosComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    SharedModule
  ]
})
export class MovimientosModule { }
