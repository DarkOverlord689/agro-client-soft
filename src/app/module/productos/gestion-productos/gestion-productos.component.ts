import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss'],
})
export class GestionProductosComponent implements OnInit {
  isVisibleProductList: boolean = false;

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
    private message: NzMessageService,
    private _utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;

    this.getInventario();
  }

  // EVENT
  recibirModalAgregar(event: boolean) {
    this.isVisibleProductList = event;
  }

  // HTTP
  async getInventario() {
    this._httpImplService.obtener("inventario/list")
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
