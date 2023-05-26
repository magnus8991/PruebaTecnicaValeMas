import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Restaurante } from '../../Modelos/restaurante';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioRestaurante } from '../../Servicios/restaurante.service';
import { Peticion, PeticionConsulta } from '../../Modelos/peticion';
import { Mensajes } from '../../Servicios/mensajes';

@Component({
  selector: 'app-actualizacion-restaurante',
  templateUrl: './act-restaurante.component.html',
  styleUrls: ['./act-restaurante.component.css']
})
export class ActualizacionRestauranteComponent implements OnInit {
  formularioActualizacion: FormGroup;
  @Input() restaurante: Restaurante;
  peticion: Peticion<Restaurante>;


  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
    private servicioRestaurante: ServicioRestaurante, private mensajes: Mensajes) { }

  ngOnInit(): void {
    this.peticion = new Peticion(new Restaurante());
    this.peticion.elemento = this.restaurante;
    this.EstablecerValidacionesFormulario();
  }

  Actualizar() {
    if (this.CamposVacios())
      this.mensajes.Mostrar('¡Advertencia!','Hay uno o mas campos vacíos, por favor verifique')
    else {
      this.servicioRestaurante.Modificar(this.peticion.elemento).subscribe(r => {
        if (!r.error) {
          this.peticion = r;
          this.mensajes.Mostrar("¡Operación exitosa!", r.mensaje);
          this.activeModal.close(this.peticion.elemento);
        }
        else this.mensajes.Mostrar("¡Oh no!", r.mensaje);
      });
    }
  }

  EstablecerValidacionesFormulario() {
    this.formularioActualizacion = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
      }
    );
  }

  CamposVacios() { return (this.formularioActualizacion.invalid) ? true : false; }

  onClose() {
    if (this.peticion != null) this.activeModal.close(this.peticion.elemento);
    else this.activeModal.close(null);
  }

  get nombre() { return this.formularioActualizacion.get('nombre'); }
}
