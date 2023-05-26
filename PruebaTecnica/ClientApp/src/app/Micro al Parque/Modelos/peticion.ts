export class Peticion <G>
{
  elemento : G;
  error : boolean
  mensaje : string;

  constructor(Elemento: G) {
    this.elemento = Elemento;
  }
}

export class PeticionConsulta <G>
{
  elementos : G[] = [];
  error : boolean
  mensaje : string;
}
