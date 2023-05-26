import { Injectable, Inject } from '@angular/core';
import { Sede } from '../Modelos/sede';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../../@base/handle-http-error.service';
import { Peticion, PeticionConsulta } from '../Modelos/peticion';

@Injectable({
  providedIn: 'root'
})
export class ServicioSede {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Guardar(Sede: Sede): Observable<Peticion<Sede>> {
    return this.http.post<Peticion<Sede>>(this.baseUrl + 'api/Sede', Sede)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Sede>>('Registrar Sede', null))
      );
  }

  Consultar(RestauranteId: string): Observable<PeticionConsulta<Sede>> {
    return this.http.get<PeticionConsulta<Sede>>(this.baseUrl + 'api/Sede/' + RestauranteId)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PeticionConsulta<Sede>>('Consultar Sede', null))
      );
  }

  Buscar(IdSede: string): Observable<Peticion<Sede>> {
    return this.http.get<Peticion<Sede>>(this.baseUrl + 'api/Sede/' + IdSede)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Sede>>('Buscar Sede', null))
      );
  }

  Modificar(SedeId: number, Sede: Sede): Observable<Peticion<Sede>> {
    return this.http.put<Peticion<Sede>>(this.baseUrl + 'api/Sede/' + SedeId, Sede)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Sede>>('Actualizar Sede', null))
      );
  }

  Eliminar(NIT: string): Observable<Peticion<Sede>> {
    return this.http.delete<Peticion<Sede>>(this.baseUrl + 'api/Sede/' + NIT)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Sede>>('Eliminar Sede', null))
      );
  }
}
