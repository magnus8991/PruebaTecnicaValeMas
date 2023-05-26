import { Injectable, Inject } from '@angular/core';
import { ManipuladorDeAlimento } from '../Modelos/manipulador-de-alimento';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../../@base/handle-http-error.service';
import { Peticion, PeticionConsulta } from '../Modelos/peticion';

@Injectable({
  providedIn: 'root'
})
export class ManipuladorService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Guardar(manipuladorDeAlimento: ManipuladorDeAlimento): Observable<Peticion<ManipuladorDeAlimento>> {
    return this.http.post<Peticion<ManipuladorDeAlimento>>(this.baseUrl + 'api/Manipulador', manipuladorDeAlimento)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<ManipuladorDeAlimento>>('Registrar ManipuladorDeAlimento', null))
      );
  }

  Consultar(sedeId: number): Observable<PeticionConsulta<ManipuladorDeAlimento>> {
    return this.http.get<PeticionConsulta<ManipuladorDeAlimento>>(this.baseUrl + 'api/Manipulador/' + sedeId)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PeticionConsulta<ManipuladorDeAlimento>>('Consulta ManipuladorDeAlimento', null))
      );
  }

  Buscar(IdManipuladorDeAlimento: string): Observable<Peticion<ManipuladorDeAlimento>> {
    return this.http.get<Peticion<ManipuladorDeAlimento>>(this.baseUrl + 'api/Manipulador/' + IdManipuladorDeAlimento)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<ManipuladorDeAlimento>>('Consulta ManipuladorDeAlimento', null))
      );
  }

  Modificar(manipulador: ManipuladorDeAlimento): Observable<Peticion<ManipuladorDeAlimento>> {
    return this.http.put<Peticion<ManipuladorDeAlimento>>(this.baseUrl + 'api/Manipulador', manipulador)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<ManipuladorDeAlimento>>('Actualizar Manipulador', null))
      );
  }
}
