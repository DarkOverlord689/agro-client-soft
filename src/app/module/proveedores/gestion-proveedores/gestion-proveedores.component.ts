import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-gestion-proveedores',
  templateUrl: './gestion-proveedores.component.html',
  styleUrls: ['./gestion-proveedores.component.scss'],
})
export class GestionProveedoresComponent implements OnInit {
  isVisibleProductList: boolean = false;
  listProveedores: any[] = [];
  listInventario: any[] = [];

  proveedorSeleccionado: number = 0;

  @Output() ceacionDeInventario: EventEmitter<boolean> = new EventEmitter(
    false
  );

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

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;
    this.getProveedores();
  }
  // EVENT
  recibirModalAgregar(event: boolean) {
    this.isVisibleProductList = event;
  }

  emittirCreacionDeInventario() {
    this.ceacionDeInventario.emit(true);
  }

  changeEstadoVisibleModalInventario(proveedorId: number) {
    this.isVisibleProductList = !this.isVisibleProductList;

    if (this.isVisibleProductList) {
      this.proveedorSeleccionado = proveedorId;
    }
  }

  // HTTP
  async getProveedores() {
    await this._httpImplService.obtener("proveedores/list")
      .then((value: any) => {
        this.listProveedores = value;
        this.listProveedores = this.listProveedores.map(value => {
          return {...value, estado: value.estado == 1 ? true : false}
        }).sort((a: any, b: any) => b.estado - a.estado)
      }).catch((reason) => {
        console.log(reason);
      })
  }

  async changeEstadoProveedor(proveedorId: number, estado: boolean) {
    await this._httpImplService.actualizar(`proveedores/update-status?proveedorId=${proveedorId}&estado=${estado ? 1 : 0}`, {})
      .then((value: any) => {
        this.message.success("Estado del proveedor modificado correctamente");
        this.getProveedores();
      }).catch((reason) => {
        console.log(reason);
      })
  }
}
