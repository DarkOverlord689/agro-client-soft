import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-modal-productos-detail',
  templateUrl: './modal-productos-detail.component.html',
  styleUrls: ['./modal-productos-detail.component.scss'],
})
export class ModalProductosDetailComponent {
  @Output() abrirModalAgregar: EventEmitter<boolean> = new EventEmitter(false);

  @Input() detalleVenta: any[] = [];

    /** Opciones de tamaño de página para el paginador. */
    pageSizeOptions: number[] = [5, 10, 50];
    /** Tamaño de página actual. */
    pageSize: number = 5;
    /** Número total de elementos. */
    totalItems: number = 0;

  tagActivo: number = 1;
  tag: ITag[] = [
    {
      id: 1,
      codigo: 'VEN',
      nombreTag: 'Ventas',
      iconTag: '../../../../../../assets/icons/tags/suspensivo.svg',
    },
  ];

  selectActive: boolean = false;

  // EVENTS
  tagSeleccionadoMet(item: ITag) {
    this.tagActivo = item.id;
  }

  emitirAbrirModalAgregar() {
    this.abrirModalAgregar.emit(false);
  }
}
