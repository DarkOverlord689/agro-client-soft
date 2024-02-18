import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  register: boolean = false;

  formLogin: FormGroup;

  constructor(
    private _hhtpService: HttpService,
    private _httpImplService: HttpImplService,
    private _utilsService: UtilsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._hhtpService.apiUrl = environment.url;
  }

  toggleRegister() {
    this.register = !this.register;
  }

  postLogin() {
    this._httpImplService
      .guardar('auth/login', {
        username: 'lvalenciadev',
        password: '@Luis1821',
      })
      .then((value: any) => {
        this._utilsService.setLocalStorages('token', value.token);
        this._utilsService.setLocalStorages('auth', JSON.stringify(value));
        this.router.navigateByUrl('/main')
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
