import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-creacion-proveedores',
  templateUrl: './creacion-proveedores.component.html',
  styleUrls: ['./creacion-proveedores.component.scss']
})
export class CreacionProveedoresComponent {
  formsProveedores: FormGroup;

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.formsProveedores = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      // REVISAR ESTE CAMPO
      descripcion: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      segundoTelefono: ["", [Validators.required]],
      correo: ["", [Validators.required]],
      sitioWeb: ["", [Validators.required]],
      fkBanco: ["", [Validators.required]],
      nombreBeneficiario: ["", [Validators.required]],
      numeroCuenta: ["", [Validators.required]],
      fechaCreacionEmpresa: ["", [Validators.required]],
      fkCategoria: ["", [Validators.required]],
      brutoAnual: ["", [Validators.required]],
    })
  }

  // HTTP
  async getBancos() {

  }

  async getCategorias() {

  }
  async postProveedores() {
    if (this.formsProveedores.invalid) return;
    this._httpService.apiUrl = environment.url;
    await this._httpImplService.guardar("proveedores/created-proveedor", {
      nombre: this.formsProveedores.value.nombre,
      descripcion: this.formsProveedores.value.descripcion,
      telefono: this.formsProveedores.value.telefono,
      segundoTelefono: this.formsProveedores.value.segundoTelefono,
      correo: this.formsProveedores.value.correo,
      sitioWeb: this.formsProveedores.value.sitioWeb,
      fkBanco: this.formsProveedores.value.fkBanco,
      nombreBeneficiario: this.formsProveedores.value.nombreBeneficiario,
      numeroCuenta: this.formsProveedores.value.numeroCuenta,
      fechaCreacionEmpresa: this.formsProveedores.value.fechaCreacionEmpresa,
      fkCategoria: this.formsProveedores.value.fkCategoria,
      brutoAnual: this.formsProveedores.value.brutoAnual,
    })
      .then((value: any) => {
        this.message.success("Proveedor creado correctamente");
      }).catch((reason) => {
        console.log(reason);
      })
  }
}
