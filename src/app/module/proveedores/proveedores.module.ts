import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreacionProveedoresComponent } from './creacion-proveedores/creacion-proveedores.component';
import { GestionProveedoresComponent } from './gestion-proveedores/gestion-proveedores.component';
import { DashboardProveedoresComponent } from './dashboard-proveedores/dashboard-proveedores.component';


@NgModule({
  declarations: [
    ProveedoresComponent,
    CreacionProveedoresComponent,
    GestionProveedoresComponent,
    DashboardProveedoresComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule
  ]
})
export class ProveedoresModule { }
