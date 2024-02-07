import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './facturacion.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FacturacionComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    SharedModule
  ]
})
export class FacturacionModule { }
