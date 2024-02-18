import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BancosComponent } from './bancos/bancos.component';
import { TiposComponent } from './tipos/tipos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalCreatedBancoComponent } from './components/modal/modal-created-banco/modal-created-banco.component';
import { ModalCreatedTiposComponent } from './components/modal/modal-created-tipos/modal-created-tipos.component';
import { ModalCreatedCategoriaComponent } from './components/modal/modal-created-categoria/modal-created-categoria.component';
import { ModalCreatedUsuariosComponent } from './components/modal/modal-created-usuarios/modal-created-usuarios.component';


@NgModule({
  declarations: [
    ConfiguracionComponent,
    BancosComponent,
    TiposComponent,
    CategoriaComponent,
    UsuariosComponent,
    ModalCreatedBancoComponent,
    ModalCreatedTiposComponent,
    ModalCreatedCategoriaComponent,
    ModalCreatedUsuariosComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    SharedModule
  ]
})
export class ConfiguracionModule { }
