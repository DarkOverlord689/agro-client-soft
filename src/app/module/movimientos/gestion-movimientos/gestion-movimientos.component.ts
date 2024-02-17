import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-gestion-movimientos',
  templateUrl: './gestion-movimientos.component.html',
  styleUrls: ['./gestion-movimientos.component.scss'],
})
export class GestionMovimientosComponent implements OnInit {
  listMovimientos: any[] = [];

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
    this.getMovimientos();
  }

  // HTTP
  async getMovimientos() {
    await this._httpImplService
      .obtener('ventas/list')
      .then((value: any) => {
        this.listMovimientos = value;
        this.listMovimientos = this.listMovimientos.sort(
        (a: any, b: any) => b.fechaVenta - a.fechaVenta
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
