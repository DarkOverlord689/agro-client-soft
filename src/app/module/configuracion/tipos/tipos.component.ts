import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss'],
})
export class TiposComponent implements OnInit {
  listTiposByMaestros: any[] = [];
  tiposMaestras: any[] = [];
  selectTipos: string = '';
  crearTipo: boolean = false;
  crearTipoMaestro: boolean = false;

  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  formsTiposMaestro: FormGroup;
  formsTipo: FormGroup;


  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService,
    private _formBuilder: FormBuilder
  ) {
    this.formsTiposMaestro = this._formBuilder.group({
      nombre: ['', [Validators.required]],
    });

    this.formsTipo = this._formBuilder.group({
      nombre: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;
    this.getTiposMaestras();
  }

  async getTiposMaestras() {
    await this._httpImplService
      .obtener('configuracion/list-tipos-maestros')
      .then((value: any) => {
        this.tiposMaestras = value;
      })
      .catch((reason) => {});
  }

  async postTiposMaestros() {
    if (this.formsTiposMaestro.invalid) return;
    await this._httpImplService
      .guardar('configuracion/created-tipos-maestros', {
        codigo: this.formsTiposMaestro.get('codigo')?.value,
        nombre: this.formsTiposMaestro.get('nombre')?.value,
        descripcion: this.formsTiposMaestro.get('descripcion')?.value,
        estado: 1,
      })
      .then((value: any) => {})
      .catch((reason) => {});
  }

  async changeTipos() {
    this._httpImplService
      .obtener(`configuracion/list-tipos?codigo=${this.selectTipos}`)
      .then((value: any) => {
        this.listTiposByMaestros = value;
        this.listTiposByMaestros = this.listTiposByMaestros.sort((a: any, b: any) => b.estado - a.estado)
      })
      .catch((reason) => {});
  }

  async postTipo() {
    if (this.formsTipo.invalid) return;
    this._httpImplService
    .guardar(`configuracion/created-tipos`, {
      codigo: String(this.formsTipo.value.nombre).substring(0, 3).toUpperCase(),
      nombre: this.formsTipo.value.nombre,
      fkTipoMaestros: this.tiposMaestras.find((value) => value.codigo == this.selectTipos).id,
    })
    .then((value: any) => {
      this.formsTiposMaestro.reset();
      this.crearTipo = false;
      this.message.success("Tipo creado correctamente");
      this.changeTipos();
    })
    .catch((reason) => {});
  }
  
  async postTipoMaestra() {
    if (this.formsTiposMaestro.invalid) return;
    await this._httpImplService
      .guardar('configuracion/created-tipos-maestros', {
        codigo: String(this.formsTiposMaestro.value.nombre)
          .substring(0, 3)
          .toUpperCase(),
        nombre: this.formsTiposMaestro.value.nombre,
      })
      .then((value: any) => {
        this.formsTiposMaestro.reset();
        this.crearTipoMaestro = false;
        this.message.success('Tipo maestro creado correctamente');
        this.getTiposMaestras();
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async changeEstadoTipo(idTipo: number, estado: boolean) {
    await this._httpImplService.actualizar(`configuracion/change-status-tipos?idTipo=${idTipo}&estado=${estado ? 1 : 0}`, {})
      .then((value: any) => {
        this.message.success("Estado del tipo modificado correctamente");
        this.changeTipos();
      }).catch((reason) => {
        console.log(reason);
      })
  }
}
