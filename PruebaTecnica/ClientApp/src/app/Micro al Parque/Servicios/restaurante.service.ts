import { Injectable, Inject } from '@angular/core';
import { Restaurante } from '../Modelos/restaurante';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../../@base/handle-http-error.service';
import { Peticion, PeticionConsulta } from '../Modelos/peticion';

@Injectable({
  providedIn: 'root'
})
export class ServicioRestaurante {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Guardar(restaurante: Restaurante): Observable<Peticion<Restaurante>> {
    return this.http.post<Peticion<Restaurante>>(this.baseUrl + 'api/Restaurante', restaurante)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Restaurante>>('Registrar Restaurante', null))
      );
  }

  Consultar(): Observable<PeticionConsulta<Restaurante>> {
    return this.http.get<PeticionConsulta<Restaurante>>(this.baseUrl + 'api/Restaurante')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PeticionConsulta<Restaurante>>('Consultar Restaurante', null))
      );
  }

  Buscar(IdRestaurante: string): Observable<Peticion<Restaurante>> {
    return this.http.get<Peticion<Restaurante>>(this.baseUrl + 'api/Restaurante/' + IdRestaurante)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Restaurante>>('Buscar Restaurante', null))
      );
  }

  Modificar(restaurante: Restaurante): Observable<Peticion<Restaurante>> {
    return this.http.put<Peticion<Restaurante>>(this.baseUrl + 'api/Restaurante', restaurante)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Restaurante>>('Actualizar Restaurante', null))
      );
  }

  Eliminar(NIT: string): Observable<Peticion<Restaurante>> {
    return this.http.delete<Peticion<Restaurante>>(this.baseUrl + 'api/Restaurante/' + NIT)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Restaurante>>('Eliminar Restaurante', null))
      );
  }
}
