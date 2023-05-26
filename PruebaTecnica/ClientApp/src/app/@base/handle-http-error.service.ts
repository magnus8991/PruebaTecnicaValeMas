import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mensajes } from '../Micro al Parque/Servicios/mensajes';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(private mensajes: Mensajes) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == "500") {
        this.mensajes.Mostrar("¡Oh no!", error);
      }
      else if (error.status == "400") {
        this.mostrarError400(error);
      }
      else if (error.status == "401") {
        this.mensajes.Mostrar("¡Oh no!", error);
      }
      return of(result as T);
    };
  }
  public log(message: string) {
    console.log(message);
  }

  private mostrarError400(error: any): void {
    console.error(error);
    let contadorValidaciones: number = 0;
    let mensajeValidaciones: string =
      `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la
    operación.<br/><br/>`;
    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;
      error.error.errors[prop].forEach(element => {
        mensajeValidaciones += `<br/> - ${element}`;
      });
      mensajeValidaciones += `<br/>`;
    }
    this.mensajes.Mostrar('Mensaje de Error', mensajeValidaciones + error.error + `<br/>`);
  }

}
