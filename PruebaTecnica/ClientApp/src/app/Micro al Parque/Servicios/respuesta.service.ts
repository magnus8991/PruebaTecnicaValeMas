import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../../@base/handle-http-error.service';
import { Peticion, PeticionConsulta } from '../Modelos/peticion';
import { Respuesta } from '../Modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Guardar(Respuesta: Respuesta): Observable<Peticion<Respuesta>> {
    return this.http.post<Peticion<Respuesta>>(this.baseUrl + 'api/Respuesta', Respuesta)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<Respuesta>>('Registrar Respuesta', null))
      );
  }

  Consultar(manipuladorId: string): Observable<PeticionConsulta<Respuesta>> {
    return this.http.get<PeticionConsulta<Respuesta>>(this.baseUrl + 'api/Respuesta/' + manipuladorId)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PeticionConsulta<Respuesta>>('Consulta Respuesta', null))
      );
  }

  Modificar(Respuestas: Respuesta[]): Observable<PeticionConsulta<Respuesta>> {
    return this.http.put<PeticionConsulta<Respuesta>>(this.baseUrl + 'api/Respuesta', Respuestas)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PeticionConsulta<Respuesta>>('Modificar Respuestas', null))
      );
  }
}
