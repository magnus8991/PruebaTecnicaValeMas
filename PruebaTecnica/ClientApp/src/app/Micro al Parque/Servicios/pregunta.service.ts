import { Injectable, Inject } from '@angular/core';
import { Pregunta } from '../Modelos/pregunta';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../../@base/handle-http-error.service';
import { Peticion, PeticionConsulta } from '../Modelos/peticion';

@Injectable({
  providedIn: 'root'
})
export class ServicioPregunta {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Consultar(tipoPregunta: string): Observable<PeticionConsulta<Pregunta>> {
    return this.http.get<PeticionConsulta<Pregunta>>(this.baseUrl + 'api/Pregunta/' + tipoPregunta)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PeticionConsulta<Pregunta>>('Consultar Pregunta', null))
      );
  }


}
