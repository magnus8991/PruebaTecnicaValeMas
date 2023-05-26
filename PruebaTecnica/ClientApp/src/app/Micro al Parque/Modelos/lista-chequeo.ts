import { RespuestaChequeo } from "./respuesta-chequeo";

export class ListaChequeo {
  listaChequeoId : number;
  respuestaChequeos : RespuestaChequeo []= [];
  fecha : Date;
  sedeId: number;
  porcentajeCumplimiento : number;
}
