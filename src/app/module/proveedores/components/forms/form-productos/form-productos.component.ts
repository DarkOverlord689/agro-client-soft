import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInventarioSeleccionado } from '../../../models/IInventario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent {
  @Input() inventarioSeleccionado!: IInventarioSeleccionado;
  @Output() notificarCambioTag: EventEmitter<void> = new EventEmitter();

  formsInventario: FormGroup;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.formsInventario = this.formBuilder.group({
      rango: ["", [Validators.required]],
      costoProveedor: ["", [Validators.required]],
      cantidadProveedor: ["", [Validators.required]],
      valorVenta: ["", [Validators.required]],
    })
  }

  // EVENT
  notificarCambioTagEvent() {
    this.notificarCambioTag.emit();
  }

  //  HTTP
  async postInventarioUpdate() {
    if (this.formsInventario.invalid) return;
    this._httpService.apiUrl = environment.url;
    await this._httpImplService.guardar("inventario/update-inventario", {
      fechaInicialVen: this.formsInventario.value.rango[0],
      fechaFinalVen: this.formsInventario.value.rango[1],
      costoProveedor: this.formsInventario.value.costoProveedor,
      cantidadProveedor: this.formsInventario.value.cantidadProveedor,
      valorVenta: this.formsInventario.value.valorVenta,
    })
      .then((value: any) => {
        this.message.success("Producto modificado correctamente");
        this.notificarCambioTagEvent();
      }).catch((reason) => {
        console.log(reason);
      })
  }
}
