import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Restaurante } from '../../Modelos/restaurante';
import { NgbActiveModal, NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ServicioRestaurante } from '../../Servicios/restaurante.service';
import { Peticion, PeticionConsulta } from '../../Modelos/peticion';
import { Mensajes } from '../../Servicios/mensajes';
import { Propietario } from '../../Modelos/persona';
import { Sede } from '../../Modelos/sede';
import { RegistroSedeComponent } from '../registro-sede/registro-sede.component';
import { ServicioSede } from '../../Servicios/sede.service';

@Component({
  selector: 'app-registro-restaurante',
  templateUrl: './registro-restaurante.component.html',
  styleUrls: ['./registro-restaurante.component.css']
})
export class RegistroRestauranteComponent implements OnInit {
  peticion: Peticion<Restaurante>;
  peticionSede: PeticionConsulta<Sede>;
  propietario: Propietario
  formularioRegistro: FormGroup;
  formularioRegistroPropietario: FormGroup;
  active;

  constructor
    (
      private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private mensajes: Mensajes,
      private servicioRestaurante: ServicioRestaurante, private modalService: NgbModal,
      public ngbNav: NgbNav, private servicioSede: ServicioSede
    ) { }

  ngOnInit(): void {
    this.peticion = new Peticion(new Restaurante());
    this.propietario = new Propietario();
    this.peticionSede = new PeticionConsulta();
    this.EstablecerValidacionesFormulario();
    this.EstablecerValidacionesFormularioPropietario();
  }

  Registrar() {
    if (this.CamposVacios()) {
      this.mensajes.Mostrar("¡Advertencia!", "Hay errores o campos vacíos en el formulario, por favor verifique");
    }
    else {
      if (this.peticionSede.elementos.length > 0) {
        this.peticion.elemento.propietario = this.propietario;
        this.servicioRestaurante.Guardar(this.peticion.elemento).subscribe(peticion => {
          if (peticion != null) {
            this.peticion = peticion;
            this.mensajes.Mostrar("¡Operación Exitosa!", peticion.mensaje);
            this.RegistrarSedes();
            this.onClose();
          }
        });
      }
      else this.mensajes.Mostrar("Cuidado!","Debe registrar por lo menos la sede principal")
    }
  }

  RegistrarSedes() {
    var mensaje: string = '';
    var error = 0
    this.peticionSede.elementos.forEach(sede => {
      this.servicioSede.Guardar(sede).subscribe(result => {
        if (result.error) {
          mensaje += "- " + result.mensaje + "\n";
          error += 1;
        }
      });
    });
    if (error > 0) this.mensajes.Mostrar("¡Advertencia!", mensaje);
  }

  EstablecerValidacionesFormulario() {
    this.formularioRegistro = this.formBuilder.group(
      {
        NIT: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
      }
    );
  }

  EstablecerValidacionesFormularioPropietario() {
    this.formularioRegistroPropietario = this.formBuilder.group(
      {
        identificacion: ['', [, Validators.pattern('^[0-9]+$'), Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
        nombres: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        primerApellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        segundoApellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        sexo: ['', [Validators.required]],
        edad: [, [Validators.required, Validators.min(18), Validators.max(120)]]
      }
    );
  }

  CamposVacios(): boolean {
    return (this.formularioRegistro.invalid || this.formularioRegistroPropietario.invalid) ? true : false;
  }

  AgregarSede() {
    const modelo = this.modalService.open(RegistroSedeComponent, { size: 'xl', backdrop: 'static', keyboard: false });
    modelo.componentInstance.NIT = this.peticion.elemento.nit;
    modelo.result.then(s => {
      if (s == 'error')
        this.mensajes.Mostrar("¡Cuidado!", "Debe digitar el NIT del restaurante antes de registrar una sede");
      else {
        if (s != null) {
          var sede: Sede = s;
          if (sede.nombre != undefined) {
            var contador = 0;
            this.peticionSede.elementos.forEach(sedeLista => {
              if (sedeLista.nombre == sede.nombre) contador += 1;
            });
            if (contador > 0) this.mensajes.Mostrar("¡Cuidado!", "La Sede " + sede.nombre + " ya está agregada");
            else this.peticionSede.elementos.push(s);
          }
        }
      }
    });
  }

  EliminarSede(indice: number) { this.peticionSede.elementos.splice(indice, 1); }

  onClose() {this.activeModal.close();}

  get identificacion() { return this.formularioRegistroPropietario.get('identificacion'); }
  get nombres() { return this.formularioRegistroPropietario.get('nombres'); }
  get primerApellido() { return this.formularioRegistroPropietario.get('primerApellido'); }
  get segundoApellido() { return this.formularioRegistroPropietario.get('segundoApellido'); }
  get sexo() { return this.formularioRegistroPropietario.get('sexo'); }
  get edad() { return this.formularioRegistroPropietario.get('edad'); }

  get NIT() { return this.formularioRegistro.get('NIT'); }
  get nombre() { return this.formularioRegistro.get('nombre'); }

}
