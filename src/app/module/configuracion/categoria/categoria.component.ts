import { catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  listCategoriaByMaestros: any[] = [];
  categoriasMaestras: any[] = [];
  selectCategoria: string = '';

  pageSizeOptions: number[] = [10, 50, 100];
  /** Tamaño de página actual. */
  pageSize: number = 10;
  /** Número total de elementos. */
  totalItems: number = 0;

  crearCategoria: boolean = false;
  crearCategoriaMaestra: boolean = false;

  formsCategoria: FormGroup;
  formsCategoriaMaestra: FormGroup;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService,
    private _formBuilder: FormBuilder
  ) {
    this.formsCategoria = this._formBuilder.group({
      nombre: ['', [Validators.required]],
    });

    this.formsCategoriaMaestra = this._formBuilder.group({
      nombre: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;
    this.getCategoriasMaestras();
  }

  async getCategoriasMaestras() {
    await this._httpImplService
      .obtener('configuracion/list-categorias-maestros')
      .then((value: any) => {
        this.categoriasMaestras = value;
      })
      .catch((reason) => {});
  }

  async changeCategoria() {
    this._httpImplService
      .obtener(`configuracion/list-categorias?codigo=${this.selectCategoria}`)
      .then((value: any) => {
        this.listCategoriaByMaestros = value;
        this.listCategoriaByMaestros = this.listCategoriaByMaestros.sort(
          (a: any, b: any) => b.estado - a.estado
        );
      })
      .catch((reason) => {});
  }
  async postCategoria() {
    if (this.formsCategoria.invalid) return;
    this._httpImplService
      .guardar(`configuracion/created-categorias`, {
        codigo: String(this.formsCategoria.value.nombre)
          .substring(0, 3)
          .toUpperCase(),
        nombre: this.formsCategoria.value.nombre,
        fkCategoriaMaestra: this.categoriasMaestras.find(
          (value) => value.codigo == this.selectCategoria
        ).id,
      })
      .then((value: any) => {
        this.formsCategoria.reset();
        this.crearCategoria = false;
        this.message.success('Categoria creada correctamente');
        this.changeCategoria();
      })
      .catch((reason) => {});
  }

  async postCategoriaMaestra() {
    if (this.formsCategoriaMaestra.invalid) return;
    await this._httpImplService
      .guardar('configuracion/created-categoria-maestros', {
        codigo: String(this.formsCategoriaMaestra.value.nombre)
          .substring(0, 3)
          .toUpperCase(),
        nombre: this.formsCategoriaMaestra.value.nombre,
      })
      .then((value: any) => {
        this.formsCategoriaMaestra.reset();
        this.crearCategoriaMaestra = false;
        this.message.success('Categoria maestra creada correctamente');
        this.getCategoriasMaestras();
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async changeEstadoCategoria(idCategoria: number, estado: boolean) {
    await this._httpImplService
      .actualizar(
        `configuracion/change-status-categoria?idCategoria=${idCategoria}&estado=${
          estado ? 1 : 0
        }`,
        {}
      )
      .then((value: any) => {
        this.message.success('Estado de la categoria modificado correctamente');
        this.changeCategoria();
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
