import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sede } from '../../Modelos/sede';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Peticion } from '../../Modelos/peticion';
import { Mensajes } from '../../Servicios/mensajes';

@Component({
  selector: 'app-registro-sede',
  templateUrl: './registro-sede.component.html',
  styleUrls: ['./registro-sede.component.css']
})
export class RegistroSedeComponent implements OnInit {
  peticion: Peticion<Sede>;
  formularioRegistro: FormGroup;
  @Input() NIT;

  constructor
    (
      private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
      private mensajes: Mensajes
    ) { }

  ngOnInit(): void {
    this.peticion = new Peticion(new Sede());
    this.EstablecerValidacionesFormulario();
    this.ValidarNIT();
  }

  ValidarNIT() {
    if (this.NIT != undefined && this.NIT != '') this.peticion.elemento.restauranteId = this.NIT;
    else this.activeModal.close('error');
  }

  Agregar() {
    if (this.CamposVacios())
      this.mensajes.Mostrar("¡Advertencia!", "Hay errores o campos vacíos en el formulario, por favor verifique");
    else {
      this.peticion.elemento.telefono = this.peticion.elemento.telefono.valueOf();
      this.activeModal.close(this.peticion.elemento);
    }
  }

  EstablecerValidacionesFormulario() {
    this.formularioRegistro = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        telefono: [0, [Validators.required, Validators.minLength(7), Validators.maxLength(10), 
          Validators.pattern('^[0-9]+$')]]
      }
    );
  }

  CamposVacios(): boolean {
    return (this.formularioRegistro.invalid) ? true : false;
  }

  onClose() {
    if (this.peticion != null) this.activeModal.close(this.peticion.elemento);
    else this.activeModal.close(null);
  }

  get nombre() { return this.formularioRegistro.get('nombre'); }
  get direccion() { return this.formularioRegistro.get('direccion'); }
  get telefono() { return this.formularioRegistro.get('telefono'); }
}
