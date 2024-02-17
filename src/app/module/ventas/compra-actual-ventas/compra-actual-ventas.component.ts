import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Component, OnInit } from '@angular/core';
import { CompraService } from '../services/compra.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';
import { IVentas } from '../models/IVentas.interface';

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

  async postVenta() {
    let ventaTotal: number = 0;

    this.listProductos.forEach((value: IVentas) => {
      ventaTotal += value.cantidad * value.precio;
    });

    await this._httpImplServicie.guardar('ventas/created-venta', {
      fechaVenta: this._utilsService.formatDate(new Date()),
      fkTipoVenta: 4,
      fkVendedor: 1,
      monto: ventaTotal,
      facturaUrl: 'www.example.com',
      ingreso: ventaTotal,
      egreso: 0,
    });
  }

  async postVentaDetalle() {
    await this._httpImplServicie.guardar('ventas/created-venta-detalle', {});
  }
}
