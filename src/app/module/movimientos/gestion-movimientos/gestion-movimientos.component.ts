import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-movimientos',
  templateUrl: './gestion-movimientos.component.html',
  styleUrls: ['./gestion-movimientos.component.scss']
})
export class GestionMovimientosComponent {
  listInventario = [""];

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;
}
