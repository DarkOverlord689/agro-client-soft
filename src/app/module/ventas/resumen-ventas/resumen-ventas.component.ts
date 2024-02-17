import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-resumen-ventas',
  templateUrl: './resumen-ventas.component.html',
  styleUrls: ['./resumen-ventas.component.scss'],
})
export class ResumenVentasComponent {
  listVentas: any[] = [];

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService,
    private _utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;

    this.getResumenVentas();
  }

  // HTTP
  async getResumenVentas() {
    await this._httpImplService
      .obtener('ventas/list')
      .then((value: any) => {
        this.listVentas = value;
        this.listVentas = this.listVentas.sort(
          (a: any, b: any) => b.fechaVenta - a.fechaVenta
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
