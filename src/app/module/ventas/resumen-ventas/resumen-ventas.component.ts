import { Component } from '@angular/core';

@Component({
  selector: 'app-resumen-ventas',
  templateUrl: './resumen-ventas.component.html',
  styleUrls: ['./resumen-ventas.component.scss']
})
export class ResumenVentasComponent {
  listInventario = [""];

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;
}
