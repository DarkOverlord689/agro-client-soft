import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, concatMap, tap } from 'rxjs';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  tiempoExpiracion: any;

  constructor(
    private _utilsService: UtilsService
  ) {}

  // Método para interceptar cada solicitud HTTP y agregar un token JWT.
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Se obtiene el token JWT del servicio TokenService.
    const token = this._utilsService.getLocalStorages('token');
    // Si el token JWT está presente, se clona la solicitud original y se agrega un encabezado "Authorization" con el token JWT.
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });

      // Se llama al siguiente interceptor HTTP en la cadena con la solicitud clonada que contiene el token JWT.
      return next.handle(cloned).pipe(
        tap((event: HttpEvent<any>) => {
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this._utilsService.logout();
            throw error;
          } else if (error.status === 403) {
            this._utilsService.logout();
            throw error;
          } else {
            throw error;
          }
        })
      );
    }
    // Si el token JWT no está presente, se llama al siguiente interceptor HTTP en la cadena con la solicitud original sin modificaciones.
    else {
      return next.handle(request);
    }
  }
}
