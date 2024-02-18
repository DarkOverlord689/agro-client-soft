import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Component, OnInit } from '@angular/core';
import { CompraService } from '../services/compra.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';
import { IVentas } from '../models/IVentas.interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-compra-actual-ventas',
  templateUrl: './compra-actual-ventas.component.html',
  styleUrls: ['./compra-actual-ventas.component.scss'],
})
export class CompraActualVentasComponent implements OnInit {
  listProductos: IVentas[] = [];
  total: number = 0;
  constructor(
    private _httpService: HttpService,
    private _httpImplServicie: HttpImplService,
    public _compraService: CompraService,
    private message: NzMessageService,
    private _utilsService: UtilsService
  ) {}
  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;

    this._compraService.compra$.subscribe((value) => {
      this.listProductos = value;
      this.total = 0;

      this.listProductos.forEach((value: IVentas) => {
        this.total += value.cantidad * value.precio;
      });
    });
  }

  aumentarProducto(item: IVentas) {
    const cantidadDisponible = this.listProductos.find(
      (value: IVentas) => value.id == item.id
    )?.disponible;
    console.log(item.cantidad + 1);
    console.log(cantidadDisponible);

    if (item.cantidad + 1 > cantidadDisponible!) {
      this.message.warning(
        'No es posible aumentar la cantidad, no contamos con esa cantidad para este producto'
      );
      return;
    }
    this._compraService.addCantidad(item.id, 1, false);
  }

  async postVenta() {
    let ventaTotal: number = 0;

    this.listProductos.forEach((value: IVentas) => {
      ventaTotal += value.cantidad * value.precio;
    });

    await this._httpImplServicie
      .guardar('ventas/created-venta', {
        fechaVenta: this._utilsService.formatDate(new Date()),
        fkTipoVenta: 4,
        fkVendedor: 1,
        monto: ventaTotal,
        facturaUrl: 'www.example.com',
        ingreso: ventaTotal,
        egreso: 0,
      })
      .then((value: any) => {
        this.postVentaDetalle(value);
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }

  async postVentaDetalle(idVenta: number) {
    const ventaJson: any[] = [];

    this.listProductos.forEach((value: IVentas) => {
      ventaJson.push({
        codigo: value.codigo,
        fkProducto: value.id,
        fkVenta: idVenta,
        cantidad: value.cantidad,
      });
    });
    await this._httpImplServicie
      .guardar('ventas/created-venta-detalle', ventaJson)
      .then((value: any) => {
        this.message.success('Venta agregada exitosamente');
        this._compraService.eliminarProducto(-1);
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }
}
