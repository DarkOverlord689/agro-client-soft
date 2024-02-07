import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardInventarioComponent } from './dashboard-inventario/dashboard-inventario.component';
import { GestionInventarioComponent } from './gestion-inventario/gestion-inventario.component';

@NgModule({
  declarations: [
    InventarioComponent,
    DashboardInventarioComponent,
    GestionInventarioComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    SharedModule
  ]
})
export class InventarioModule { }
