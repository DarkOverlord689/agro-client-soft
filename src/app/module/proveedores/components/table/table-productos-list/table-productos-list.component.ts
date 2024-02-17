import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IInventarioSeleccionado } from '../../../models/IInventario.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-table-productos-list',
  templateUrl: './table-productos-list.component.html',
  styleUrls: ['./table-productos-list.component.scss'],
})
export class TableProductosListComponent {
  @Output()
  emittirInventarioSeleccionado: EventEmitter<IInventarioSeleccionado> =
    new EventEmitter();
  @Input() listInventario: any[] = [];
  estadoFila: boolean = false;
  filaSeleccionada: number = 0;

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
  ) {
    this.listInventario = this.listInventario
      .map((value) => {
        return {
          ...value,
          estado: value.estado == 1 ? true : false,
        };
      })
      .sort((a: any, b: any) => b.estado - a.estado);
  }

  emittirInventarioSeleccionadoMet(item: any) {
    if (this.filaSeleccionada != item.id) {
      this.estadoFila = true;
    } else {
      this.estadoFila = !this.estadoFila;
    }
    this.filaSeleccionada = item.id;

    this.emittirInventarioSeleccionado.emit({
      id: item.id,
      fechaInicialVen: item.fechaInicialVen,
      fechaFinalVen: item.fechaFinalVen,
      costoProveedor: item.costoProveedor,
      cantidadProveedor: item.cantidadProveedor,
      valorVenta: item.valorVenta,
      estado: item.estado ? this.estadoFila : false,
    });

    if (!item.estado) {
      this.message.info('No puede editar este producto bo se encuentra activo');
    }
  }

  // HTTP
  async changeEstadoInventario(inventarioId: number, estado: number) {
    this._httpService.apiUrl = environment.url;
    await this._httpImplService
      .actualizar(
        `inventario/update-status?inventarioId=${inventarioId}&estado=${
          estado ? 1 : 0
        }`,
        {}
      )
      .then((value: any) => {
        this.message.success('Estado del inventario modificado correctamente');
        this.listInventario = this.listInventario.sort(
          (a: any, b: any) => b.estado - a.estado
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
