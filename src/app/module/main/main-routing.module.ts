import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { VentasComponent } from '../ventas/ventas.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { ProveedoresComponent } from '../proveedores/proveedores.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: 'Dashboard',
    }
  },
  {
    path: 'ventas',
    component: VentasComponent,
    loadChildren: () => import('../ventas/ventas.module').then(m => m.VentasModule),
    data: {
      title: 'Ventas',
    }
  },
  {
    path: 'inventario',
    component: InventarioComponent,
    loadChildren: () => import('../inventario/inventario.module').then(m => m.InventarioModule),
    data: {
      title: 'Inventario',
    }
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
    loadChildren: () => import('../proveedores/proveedores.module').then(m => m.ProveedoresModule),
    data: {
      title: 'Proveedores',
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule),
    data: {
      title: 'Usuarios',
    }
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    loadChildren: () => import('../configuracion/configuracion.module').then(m => m.ConfiguracionModule),
    data: {
      title: 'Configuración',
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
