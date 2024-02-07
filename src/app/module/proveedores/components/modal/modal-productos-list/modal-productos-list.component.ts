import { Component, EventEmitter, Output } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-modal-productos-list',
  templateUrl: './modal-productos-list.component.html',
  styleUrls: ['./modal-productos-list.component.scss'],
})
export class ModalProductosListComponent {
  @Output() abrirModalAgregar: EventEmitter<boolean> = new EventEmitter(false);

  tagActivo: number = 1;
  tag: ITag[] = [
    {
      id: 1,
      codigo: 'LIS',
      nombreTag: 'Listado',
      iconTag: '../../../../../../assets/icons/tags/suspensivo.svg',
    },
    {
      id: 2,
      codigo: 'CON_PRO',
      nombreTag: 'Configuracion del producto',
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
