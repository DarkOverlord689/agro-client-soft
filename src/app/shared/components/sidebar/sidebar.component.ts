import { Component } from '@angular/core';
import { ISidebar } from '../../models/sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  collapsed: boolean = false;

  sidebar: ISidebar[] = [];

  constructor() {
    this.sidebar = [
      {
        id: 1,
        nombre: 'Dashboard',
        active: true,
        icon: '../../../../assets/icons/sidebar/dashboard.svg',
        url: '/main/dashboard'
      },
      {
        id: 2,
        nombre: 'Ventas',
        active: true,
        icon: '../../../../assets/icons/sidebar/ventas.svg',
        url: '/main/ventas'
      },
      {
        id: 3,
        nombre: 'Pedidos',
        active: true,
        icon: '../../../../assets/icons/sidebar/pedidos.svg',
        url: '/main/pedidos'
      },
      {
        id: 4,
        nombre: 'Inventario',
        active: true,
        icon: '../../../../assets/icons/sidebar/inventario.svg',
        url: '/main/inventario'
      },
      {
        id: 5,
        nombre: 'Facturación',
        active: true,
        icon: '../../../../assets/icons/sidebar/facturacion.svg',
        url: '/main/facturacion'
      },
      {
        id: 6,
        nombre: 'Producción',
        active: true,
        icon: '../../../../assets/icons/sidebar/produccion.svg',
        url: '/main/produccion'
      },
      {
        id: 7,
        nombre: 'Notificación',
        active: true,
        icon: '../../../../assets/icons/sidebar/notificacion.svg',
        url: '/main/notificacion'
      },
      {
        id: 8,
        nombre: 'Configuración',
        active: true,
        icon: '../../../../assets/icons/sidebar/configuracion.svg',
        url: '/main/configuracion'
      }
    ]
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
