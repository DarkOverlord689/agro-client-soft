import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss'],
})
export class GestionUsuariosComponent implements OnInit {
  listUser: any[] = [];

  /** Opciones de tamaño de página para el paginador. */
  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private nzMessageService: NzMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    this._httpService.apiUrl = environment.url;

    await this.getListUser();
  }

  cancel(): void {
    this.nzMessageService.info('Cambio de estado cancelado');
    this.getListUser();
  }

  confirm(item: any): void {
    this.changeStatusUser(item);
  }

  async getListUser() {
    await this._httpImplService
      .obtener('usuarios/list')
      .then((value: any) => {
        this.listUser = value;
      })
      .catch((err: any) => {});
  }

  async changeStatusUser(item: any) {
    await this._httpImplService
      .actualizar(
        `usuarios/update-status?user=${item.id}&estado=${item.estado ? 1 : 0}`,
        {}
      )
      .then((value: any) => {
        this.nzMessageService.info('Estado del usuario cambiado correctamente');
        this.getListUser();
      })
      .catch((err: any) => {});
  }
}
