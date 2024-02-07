import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { DashboardMovimientosComponent } from './dashboard-movimientos/dashboard-movimientos.component';
import { GestionMovimientosComponent } from './gestion-movimientos/gestion-movimientos.component';
import { MovimientosComponent } from './movimientos.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardMovimientosComponent,
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
