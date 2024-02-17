import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ITag } from 'src/app/shared/models/tag.interface';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';
import { IInventarioSeleccionado } from '../../../models/IInventario.interface';

@Component({
  selector: 'app-modal-productos-list',
  templateUrl: './modal-productos-list.component.html',
  styleUrls: ['./modal-productos-list.component.scss'],
})
export class ModalProductosListComponent implements OnInit {
  @Output() abrirModalAgregar: EventEmitter<boolean> = new EventEmitter(false);

  @Input() proveedorId: number = 0;
  listInventario: any[] = [];

  inventarioSeleccionado!: IInventarioSeleccionado | null;

  isEditarInventario: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService
  ) {}

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

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;

    this.getProveedoresByInventario(this.proveedorId);
  }

  // EVENTS
  tagSeleccionadoMet(item: ITag) {
    if (this.tagActivo == 2 && item.id == 1) {
      this.isEditarInventario = false;
      this.inventarioSeleccionado = null;
    }
    this.tagActivo = item.id;
  }

  emitirAbrirModalAgregar() {
    this.abrirModalAgregar.emit(false);
  }

  recibirNotificarCambioTag() {
    this.isEditarInventario = false;
    this.inventarioSeleccionado = null;
    this.tagActivo = 1;

    this.getProveedoresByInventario(this.proveedorId);
  }

  recibirInventarioSeleccionado(event: IInventarioSeleccionado) {
    this.inventarioSeleccionado = event;

    if (this.inventarioSeleccionado.estado) {
      this.isEditarInventario = true;
      return;
    }

    this.isEditarInventario = false;
  }

  // HTTP
  async getProveedoresByInventario(proveedorId: number) {
    await this._httpImplService
      .obtener(`inventario/list-by-proveedor?proveedorId=${proveedorId}`)
      .then((value: any) => {
        this.listInventario = value;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async changeEstadoDelInventario(inventarioId: number, estado: number) {
    await this._httpImplService
      .actualizar(
        `inventario/update-status?inventarioId=${inventarioId}&estado=${estado}`,
        {}
      )
      .then((value: any) => {
        this.message.success('Estado del inventario modificado correctamente');
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
