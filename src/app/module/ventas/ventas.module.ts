import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardVentasComponent } from './dashboard-ventas/dashboard-ventas.component';
import { GestionVentasComponent } from './gestion-ventas/gestion-ventas.component';
import { ResumenVentasComponent } from './resumen-ventas/resumen-ventas.component';
import { CompraActualVentasComponent } from './compra-actual-ventas/compra-actual-ventas.component';


@NgModule({
  declarations: [
    VentasComponent,
    DashboardVentasComponent,
    GestionVentasComponent,
    ResumenVentasComponent,
    CompraActualVentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ]
})
export class VentasModule { }
