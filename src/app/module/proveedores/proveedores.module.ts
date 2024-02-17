import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreacionProveedoresComponent } from './creacion-proveedores/creacion-proveedores.component';
import { GestionProveedoresComponent } from './gestion-proveedores/gestion-proveedores.component';
import { DashboardProveedoresComponent } from './dashboard-proveedores/dashboard-proveedores.component';
import { ModalProductosListComponent } from './components/modal/modal-productos-list/modal-productos-list.component';
import { AgregarInventarioComponent } from './agregar-inventario/agregar-inventario.component';
import { TableProductosListComponent } from './components/table/table-productos-list/table-productos-list.component';
import { FormProductosComponent } from './components/forms/form-productos/form-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProveedoresComponent,
    CreacionProveedoresComponent,
    GestionProveedoresComponent,
    DashboardProveedoresComponent,
    ModalProductosListComponent,
    AgregarInventarioComponent,
    TableProductosListComponent,
    FormProductosComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProveedoresModule { }
