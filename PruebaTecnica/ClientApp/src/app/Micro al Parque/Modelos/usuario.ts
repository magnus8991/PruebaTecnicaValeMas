import { Persona } from "./persona";

export class Usuario extends Persona {
  nombreUsuario: string;
  contrasena: string;
  email: string;
  rol: string;
  token: string;
}
