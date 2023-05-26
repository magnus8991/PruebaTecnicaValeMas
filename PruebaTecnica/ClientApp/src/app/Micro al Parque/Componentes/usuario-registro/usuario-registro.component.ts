import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../Modelos/usuario';
import { Mensajes } from '../../Servicios/mensajes';
import { Peticion } from '../../Modelos/peticion';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {
  peticion: Peticion<Usuario>;
  formularioRegistro: FormGroup;

  constructor(private clienteService: UsuarioService, private formBuilder: FormBuilder,
    private mensaje: Mensajes, private route: Router) { }

  ngOnInit() {
    this.peticion = new Peticion(new Usuario());
    this.inicializarFormulario();
  }

  add() {
    if (this.CamposVacios()) {
      this.mensaje.Mostrar("¡Advertencia!","Hay errores o campos vacíos en el formulario, por favor verifique");
    }
    else {
      this.clienteService.Guardar(this.peticion.elemento).subscribe(peticion => {
        if (peticion != null) {
          this.peticion = peticion;
          this.mensaje.Mostrar("¡Operación Exitosa!",peticion.mensaje);
          this.route.navigate(['/login']);
        }
      });
    }
  }

  inicializarFormulario() {
    this.formularioRegistro = this.formBuilder.group({
      identificacion: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      nombres: ['', [Validators.required, Validators.maxLength(25)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(25)]],
      segundoApellido: ['', [Validators.required, Validators.maxLength(25)]],
      edad: [0, [Validators.required, Validators.min(1), Validators.max(120)]],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(25)]],
      rol: ['', [Validators.required, Validators.maxLength(25)]],
      nombreUsuario: ['', [Validators.required, Validators.maxLength(20)]],
      contrasena: [, [Validators.required, Validators.maxLength(20)]]
    });
  }

  CamposVacios(): boolean {
    return (this.formularioRegistro.invalid) ? true : false;
  }

  get formulario() { return this.formularioRegistro.controls; }
  get identificacion() { return this.formularioRegistro.get('identificacion'); }
  get nombres() { return this.formularioRegistro.get('nombres'); }
  get primerApellido() { return this.formularioRegistro.get('primerApellido'); }
  get segundoApellido() { return this.formularioRegistro.get('segundoApellido'); }
  get edad() { return this.formularioRegistro.get('edad'); }
  get sexo() { return this.formularioRegistro.get('sexo'); }
  get email() { return this.formularioRegistro.get('email'); }
  get rol() { return this.formularioRegistro.get('rol'); }
  get nombreUsuario() { return this.formularioRegistro.get('nombreUsuario'); }
  get contrasena() { return this.formularioRegistro.get('contrasena'); }
}
