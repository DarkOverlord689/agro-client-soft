import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardVentasComponent } from './dashboard-ventas/dashboard-ventas.component';
import { GestionVentasComponent } from './gestion-ventas/gestion-ventas.component';


@NgModule({
  declarations: [
    VentasComponent,
    DashboardVentasComponent,
    GestionVentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ]
})
export class VentasModule { }
