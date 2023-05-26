import { Pipe, PipeTransform } from '@angular/core';
import { Sede } from '../Modelos/sede';

@Pipe({
  name: 'filtroSede'
})
export class FiltroSedePipe implements PipeTransform {

  transform(Sedes: Sede[], filtroSede: string): any {
    if (filtroSede == null) return Sedes;
         return Sedes.filter(s => s.sedeId.toString().indexOf(filtroSede.toLowerCase()) !== -1
         || s.nombre.toLowerCase().indexOf(filtroSede.toLowerCase()) !== -1);
      }

}
