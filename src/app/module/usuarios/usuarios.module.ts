import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { CreacionUsuariosComponent } from './creacion-usuarios/creacion-usuarios.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    GestionUsuariosComponent,
    CreacionUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule { }
