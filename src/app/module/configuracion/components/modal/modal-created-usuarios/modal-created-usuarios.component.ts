import { HttpService } from 'src/app/shared/services/http.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { environment } from 'src/environment/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-modal-created-usuarios',
  templateUrl: './modal-created-usuarios.component.html',
  styleUrls: ['./modal-created-usuarios.component.scss'],
})
export class ModalCreatedUsuariosComponent {
  myForm: FormGroup;

  listTiposDocumentos: any[] = [];
  listGenero: any[] = [];

  @Output() emitirCerrado: EventEmitter<boolean> = new EventEmitter(false);

  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    private message: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      id: [null],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      tipoDocumentoId: [null, Validators.required],
      numeroDocumento: [null, Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      tipoGeneroId: [null, Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._httpService.apiUrl = environment.url;

    this.getTipoDocumento();
    this.getGenero()
  }

  emitirCerradoModal() {
    this.emitirCerrado.emit(false);
  }

  async getTipoDocumento() {
    this._httpImplService
      .obtener('configuracion/list-tipos?codigo=TD')
      .then((value: any) => {
        this.listTiposDocumentos = value;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async getGenero() {
    this._httpImplService
      .obtener('configuracion/list-tipos?codigo=GE')
      .then((value: any) => {
        this.listGenero = value;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this._httpImplService.guardar("vendedor/created-vendedor", formData)
      .then((value: any) => {
        this.emitirCerradoModal();
        this.message.success("Creación de usuario correctamente")
      })
      .catch((reason) => {
        console.log(reason);
      });
      // Aquí podrías manipular el objeto formData si necesitas realizar alguna transformación antes de enviarlo
      // Si necesitas enviar el formulario a través de una solicitud HTTP, por ejemplo, podrías hacer algo como esto:
      // this.miServicio.enviarFormulario(formData).subscribe(
      //   response => {
      //     console.log('Respuesta del servidor:', response);
      //   },
      //   error => {
      //     console.error('Error al enviar el formulario:', error);
      //   }
      // );w1
    } else {
      console.log('El formulario no es válido. Por favor, revisa los campos.');
    }
  }
}