import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubNavbarComponent } from './components/sub-navbar/sub-navbar.component';

import { ImportacionesGlobalModule } from '../importaciones-global.module';

const COMPONENTES = [SidebarComponent, NavbarComponent, SubNavbarComponent]

const MODULOS = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  ImportacionesGlobalModule,
];
@NgModule({
  declarations: [...COMPONENTES],
  imports: [...MODULOS],
  exports: [...COMPONENTES, ...MODULOS]
})
export class SharedModule {}
