import { Pipe, PipeTransform } from '@angular/core';
import { Restaurante } from '../Modelos/restaurante';

@Pipe({
  name: 'filtroRestaurante'
})
export class FiltroRestaurantePipe implements PipeTransform {

  transform(restaurantes: Restaurante[], filtroRestaurante: string): any {
    if (filtroRestaurante == null) return restaurantes;
         return restaurantes.filter(r => r.nit.toLowerCase().indexOf(filtroRestaurante.toLowerCase()) !== -1
         || r.nombre.toLowerCase().indexOf(filtroRestaurante.toLowerCase()) !== -1);
      }

}
