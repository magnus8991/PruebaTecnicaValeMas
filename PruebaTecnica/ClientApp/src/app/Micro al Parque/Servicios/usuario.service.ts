import { Injectable, Inject } from '@angular/core';
import { Usuario } from '../Modelos/usuario';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../../@base/handle-http-error.service';
import { Peticion } from '../Modelos/peticion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Guardar(Usuario: Usuario): Observable<Peticion<Usuario>> {
    return this.http.post<Peticion<Usuario>>(this.baseUrl + 'api/Usuario', Usuario)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Usuario>>('Registrar Usuario', null))
      );
  }

  Buscar(IdUsuario: string): Observable<Peticion<Usuario>> {
    return this.http.get<Peticion<Usuario>>(this.baseUrl + 'api/Usuario/Busqueda/' + IdUsuario)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Usuario>>('Buscar Usuario', null))
      );
  }
}
