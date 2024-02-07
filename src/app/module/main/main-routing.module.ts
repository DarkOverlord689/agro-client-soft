import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { VentasComponent } from '../ventas/ventas.component';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { FacturacionComponent } from '../facturacion/facturacion.component';
import { ProduccionComponent } from '../produccion/produccion.component';
import { NotificacionComponent } from '../notificacion/notificacion.component';
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
    path: 'pedidos',
    component: PedidosComponent,
    loadChildren: () => import('../pedidos/pedidos.module').then(m => m.PedidosModule),
    data: {
      title: 'Pedidos',
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
    path: 'facturacion',
    component: FacturacionComponent,
    loadChildren: () => import('../facturacion/facturacion.module').then(m => m.FacturacionModule),
    data: {
      title: 'Facturación',
    }
  },
  {
    path: 'produccion',
    component: ProduccionComponent,
    loadChildren: () => import('../produccion/produccion.module').then(m => m.ProduccionModule),
    data: {
      title: 'Producción',
    }
  },
  {
    path: 'notificacion',
    component: NotificacionComponent,
    loadChildren: () => import('../notificacion/notificacion.module').then(m => m.NotificacionModule),
    data: {
      title: 'Notificación',
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
