import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss']
})
export class GestionProductosComponent {

  isVisibleProductList: boolean = false;

  listInventario = [""];

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  // EVENT
  recibirModalAgregar(event: boolean) {
    this.isVisibleProductList = event;
  }
}