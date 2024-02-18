import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-agregar-inventario',
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.scss'],
})
export class AgregarInventarioComponent implements OnInit {
  formInventario: FormGroup;

  listProveedor: any[] = [];
  listCategoria: any[] = [];

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private _utilService: UtilsService
  ) {
    this.formInventario = this.formBuilder.group({
      codigo: [''],
      // REVISAR ESTE CAMPO
      nombre: ['', [Validators.required]],
      fkCategoria: ['', [Validators.required]],
      fkProveedor: ['', [Validators.required]],
      rango: ['', [Validators.required]],
      costoProveedor: [0, [Validators.required]],
      cantidadProveedor: [0, [Validators.required]],
      valorVenta: [0, [Validators.required]],
      descripcion: ['', [Validators.required]],
      foto: [''],
      codigoQR: [''],
    });

    this.formInventario.get('codigo')?.disable();
  }

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;
    this.getProveedor();
    this.getCategorias();
  }

  // HTTP
  async getProveedor() {
    await this._httpImplService
      .obtener('proveedores/list')
      .then((value: any) => {
        this.listProveedor = value;
        this.listProveedor = this.listProveedor.filter(
          (value: any) => value.estado == 1
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async getCategorias() {
    await this._httpImplService
      .obtener('configuracion/list-categorias?codigo=PRO')
      .then((value: any) => {
        this.listCategoria = value;
        this.listCategoria = this.listCategoria.filter(
          (value: any) => value.estado == 1
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async postInventario() {
    if (this.formInventario.invalid) return;
    await this._httpImplService
      .guardar('inventario/created-inventario', {
        nombre: this.formInventario.value.nombre,
        fkCategoria: this.formInventario.value.fkCategoria,
        fkProveedor: this.formInventario.value.fkProveedor,
        fechaInicialVen: this._utilService.formatDate(
          this.formInventario.value.rango[0]
        ),
        fechaFinalVen: this._utilService.formatDate(
          this.formInventario.value.rango[1]
        ),
        costoProveedor: this.formInventario.value.costoProveedor,
        cantidadProveedor: this.formInventario.value.cantidadProveedor,
        valorVenta: this.formInventario.value.valorVenta,
        descripcion: this.formInventario.value.descripcion,
        estado: 1,
        foto: this.formInventario.value.foto,
        codigoQR: this.formInventario.value.codigoQR,
      })
      .then((value: any) => {
        this.message.success('Inventario agregado correctamente');
        this.formInventario.reset();
        this.formInventario.get('costoProveedor')?.setValue(0);
        this.formInventario.get('cantidadProveedor')?.setValue(0);
        this.formInventario.get('valorVenta')?.setValue(0);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
