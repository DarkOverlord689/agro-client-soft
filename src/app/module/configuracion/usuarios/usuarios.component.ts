import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  listVendedor: any[] = [];
  mostrarModalUsuario: boolean = false;

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
    this.getVendedor();
  }

  recibirCerrado(event: any) {
    this.mostrarModalUsuario = event;
    this.getVendedor();
  }

  async getVendedor() {
    await this._httpImplService
      .obtener('vendedor/list')
      .then((value: any) => {
        this.listVendedor = value;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async changeEstadoVendedor(vendedor: number, estado: boolean) {
    await this._httpImplService.actualizar(`vendedor/change-status?id=${vendedor}&estado=${estado ? 1 : 0}`, {})
      .then((value: any) => {
        this.message.success("Estado del vendedor modificado correctamente");
        this.getVendedor();
      }).catch((reason) => {
        console.log(reason);
      })
  }
}
