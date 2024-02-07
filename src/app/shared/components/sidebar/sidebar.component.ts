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
        id: 4,
        nombre: 'Inventario',
        active: true,
        icon: '../../../../assets/icons/sidebar/inventario.svg',
        url: '/main/inventario'
      },
      {
        id: 5,
        nombre: 'Proveedores',
        active: true,
        icon: '../../../../assets/icons/sidebar/usuarios.svg',
        url: '/main/proveedores'
      },
      {
        id: 6,
        nombre: 'Movimientos',
        active: true,
        icon: '../../../../assets/icons/sidebar/movimientos.svg',
        url: '/main/movimientos'
      },
      {
        id: 7,
        nombre: 'Clientes',
        active: true,
        icon: '../../../../assets/icons/sidebar/usuarios.svg',
        url: '/main/clientes'
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
