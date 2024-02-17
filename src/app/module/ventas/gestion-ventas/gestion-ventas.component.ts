import { CompraService } from './../services/compra.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-gestion-ventas',
  templateUrl: './gestion-ventas.component.html',
  styleUrls: ['./gestion-ventas.component.scss'],
})
export class GestionVentasComponent implements OnInit {
  listInventario: any[] = [];

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private _compraService: CompraService,
    private message: NzMessageService,
    private _utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;

    this.getInventario();
  }

  // METODO
  addProducto(item: any) {
    const json = {
      id: item.id,
      codigo: item.codigo,
      nombre: item.nombre,
      descripcion: item.descripcion,
      categoria: item.fkCategoria,
      cantidad: 1,
      precio: item.valorVenta,
    };
    this._compraService.addCompra(json);
  }

  // HTTP
  async getInventario() {
    this._httpImplService
      .obtener('inventario/list')
      .then((value: any) => {
        this.listInventario = value;
        this.listInventario = this.listInventario.sort(
          (a: any, b: any) => b.estado - a.estado
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
