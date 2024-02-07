import { Component, EventEmitter, Output } from '@angular/core';
import { ITag } from 'src/app/shared/models/tag.interface';

@Component({
  selector: 'app-modal-productos-detail',
  templateUrl: './modal-productos-detail.component.html',
  styleUrls: ['./modal-productos-detail.component.scss']
})
export class ModalProductosDetailComponent {
  @Output() abrirModalAgregar: EventEmitter<boolean> = new EventEmitter(false);

  tagActivo: number = 1;
  tag: ITag[] = [
    {
      id: 1,
      codigo: 'DET',
      nombreTag: 'Detalle',
      iconTag: '../../../../../../assets/icons/tags/suspensivo.svg',
    },
    {
      id: 2,
      codigo: 'COM',
      nombreTag: 'Compras',
      iconTag: '../../../../../../assets/icons/tags/suspensivo.svg',
    },
    {
      id: 3,
      codigo: 'VEN',
      nombreTag: 'Ventas',
      iconTag: '../../../../../../assets/icons/tags/suspensivo.svg',
    },
    {
      id: 4,
      codigo: 'HIS',
      nombreTag: 'Historial',
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
