import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GestionInventarioComponent } from './gestion-inventario/gestion-inventario.component';

@NgModule({
  declarations: [
    InventarioComponent,
    GestionInventarioComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    SharedModule
  ]
})
export class InventarioModule { }
