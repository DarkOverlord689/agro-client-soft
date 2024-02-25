import { Component, Output, EventEmitter } from '@angular/core';
import { IInventarioSeleccionado } from '../../../models/IInventario.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
@Component({
  selector: 'app-table-productos-list',
  templateUrl: './table-productos-list.component.html',
  styleUrls: ['./table-productos-list.component.scss']
})
export class TableProductosListComponent {
  @Output() emittirInventarioSeleccionado: EventEmitter<IInventarioSeleccionado> = new EventEmitter();
  listInventario = [""];
  estadoFila: boolean = false;

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService
  ) { }

  emittirInventarioSeleccionadoMet(id: number) {
    this.emittirInventarioSeleccionado.emit({ id: id, estado: this.estadoFila });
  }

  // HTTP
  async changeEstadoProveedor(inventarioId: number, estado: number) {
    await this._httpImplService.actualizar(`inventario/update-status?inventarioId=${inventarioId}&estado=${estado}`, {})
      .then((value: any) => {
        this.message.success("Estado del inventario modificado correctamente");
      }).catch((reason) => {
        console.log(reason);
      })
  }
}
