import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gestion-proveedores',
  templateUrl: './gestion-proveedores.component.html',
  styleUrls: ['./gestion-proveedores.component.scss'],
})
export class GestionProveedoresComponent {
  isVisibleProductList: boolean = false;
  listInventario = [''];

  @Output() ceacionDeInventario: EventEmitter<boolean> = new EventEmitter(
    false
  );

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

  emittirCreacionDeInventario() {
    this.ceacionDeInventario.emit(true);
  }
}
