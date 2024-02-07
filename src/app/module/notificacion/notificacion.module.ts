import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacionRoutingModule } from './notificacion-routing.module';
import { NotificacionComponent } from './notificacion.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NotificacionComponent
  ],
  imports: [
    CommonModule,
    NotificacionRoutingModule,
    SharedModule
  ]
})
export class NotificacionModule { }
