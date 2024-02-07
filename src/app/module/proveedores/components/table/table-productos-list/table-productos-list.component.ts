import { Component } from '@angular/core';

@Component({
  selector: 'app-table-productos-list',
  templateUrl: './table-productos-list.component.html',
  styleUrls: ['./table-productos-list.component.scss']
})
export class TableProductosListComponent {
  listInventario = [""];

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;
}
