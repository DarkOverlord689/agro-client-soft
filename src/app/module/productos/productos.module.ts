import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { ModalProductosDetailComponent } from './components/modal/modal-productos-detail/modal-productos-detail.component';


@NgModule({
  declarations: [
    ProductosComponent,
    GestionProductosComponent,
    ModalProductosDetailComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ]
})
export class ProductosModule { }
