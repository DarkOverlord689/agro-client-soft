import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionComponent } from './produccion.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProduccionComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    SharedModule
  ]
})
export class ProduccionModule { }
