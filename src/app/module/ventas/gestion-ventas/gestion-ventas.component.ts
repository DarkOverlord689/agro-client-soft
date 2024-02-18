import { CompraService } from './../services/compra.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';
import { IVentas } from '../models/IVentas.interface';

@Component({
  selector: 'app-gestion-ventas',
  templateUrl: './gestion-ventas.component.html',
  styleUrls: ['./gestion-ventas.component.scss'],
})
export class GestionVentasComponent implements OnInit {
  listProductos: IVentas[] = [];
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


    this._compraService.compra$.subscribe((value) => {
      this.listProductos = value;
    });
  }

  // METODO
  addProducto(item: any) {
    const json: IVentas = {
      id: item.id,
      codigo: item.codigo,
      nombre: item.nombre,
      descripcion: item.descripcion,
      categoria: item.fkCategoria,
      cantidad: 1,
      disponible: this.listInventario.find((value: IVentas) => value.id == item.id).cantidadProveedor,
      precio: item.valorVenta,
    };

    const jsonCont = this.listProductos.filter((value: IVentas) => value.id == json.id);

    if(jsonCont.length > 0) {
      this.message.info("Este producto ya se encuentra en el carrito de compra");
      return;
    }

    this._compraService.addCompra(json);
  }

  // HTTP
  async getInventario() {
    this._httpImplService
      .obtener('inventario/list-disponible')
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
