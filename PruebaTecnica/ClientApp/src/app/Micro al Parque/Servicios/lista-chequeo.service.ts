import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error.service';
import { ListaChequeo } from '../Modelos/lista-chequeo';
import { Peticion, PeticionConsulta } from '../Modelos/peticion';

@Injectable({
  providedIn: 'root'
})
export class ListaChequeoService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Guardar(ListaChequeo: ListaChequeo): Observable<Peticion<ListaChequeo>> {
    return this.http.post<Peticion<ListaChequeo>>(this.baseUrl + 'api/ListaChequeo', ListaChequeo)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Peticion<ListaChequeo>>('Registrar ListaChequeo', null))
      );
  }

  Consultar(SedeId: number): Observable<PeticionConsulta<ListaChequeo>> {
    return this.http.get<PeticionConsulta<ListaChequeo>>(this.baseUrl + 'api/ListaChequeo/Consulta/' + SedeId)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PeticionConsulta<ListaChequeo>>('Consultar ListaChequeo', null))
      );
  }

}
