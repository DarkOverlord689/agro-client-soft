import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss'],
})
export class BancosComponent implements OnInit {
  listBancos: any[] = [];

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
  ) {}

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;
    this.getBancos();
  }

  async getBancos() {
    await this._httpImplService
      .obtener('configuracion/list-bancos')
      .then((value: any) => {
        this.listBancos = value;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async changeEstadoBancos(id: number, estado: boolean) {
    await this._httpImplService
      .actualizar(
        `configuracion/change-status-bancos?id=${id}&estado=${estado ? 1 : 0}`,
        {}
      )
      .then((value: any) => {
        this.message.success('Estado de la categoria modificado correctamente');
        this.getBancos();
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
