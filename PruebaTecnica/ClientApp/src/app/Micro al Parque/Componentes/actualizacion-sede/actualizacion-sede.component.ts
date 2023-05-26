import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sede } from '../../Modelos/sede';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Peticion } from '../../Modelos/peticion';
import { Mensajes } from '../../Servicios/mensajes';
import { ServicioSede } from '../../Servicios/sede.service';

@Component({
  selector: 'app-actualizacion-sede',
  templateUrl: './actualizacion-sede.component.html',
  styleUrls: ['./actualizacion-sede.component.css']
})
export class ActualizacionSedeComponent implements OnInit {
  peticion: Peticion<Sede>;
  formularioActualizacion: FormGroup;
  @Input() Sede;

  constructor
    (
      private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
      private mensajes: Mensajes, private servicioSede: ServicioSede
    ) { }

  ngOnInit(): void {
    this.peticion = new Peticion(new Sede());
    this.EstablecerValidacionesFormulario();
    this.peticion.elemento = this.Sede;
  }

  Actualizar() {
    if (this.CamposVacios())
      this.mensajes.Mostrar("¡Advertencia!", "Hay errores o campos vacíos en el formulario, por favor verifique");
    else {
      this.servicioSede.Modificar(this.peticion.elemento.sedeId, this.peticion.elemento).subscribe(result => {
        if (!result.error) {
          this.peticion = result;
          this.mensajes.Mostrar("Operación exitosa",result.mensaje);
        }
        else this.mensajes.Mostrar("¡Oh no!",result.mensaje);
      });
    }
  }

  EstablecerValidacionesFormulario() {
    this.formularioActualizacion = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        telefono: [0, [Validators.required, Validators.minLength(7), Validators.maxLength(10), 
          Validators.pattern('^[0-9]+$')]]
      }
    );
  }

  onClose() { this.activeModal.close() }

  CamposVacios(): boolean {
    return (this.formularioActualizacion.invalid) ? true : false;
  }

  get nombre() { return this.formularioActualizacion.get('nombre'); }
  get direccion() { return this.formularioActualizacion.get('direccion'); }
  get telefono() { return this.formularioActualizacion.get('telefono'); }
}
