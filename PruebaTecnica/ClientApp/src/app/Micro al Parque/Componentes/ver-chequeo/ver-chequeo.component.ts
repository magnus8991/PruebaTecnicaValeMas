import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListaChequeo } from '../../Modelos/lista-chequeo';
import { Pregunta } from '../../Modelos/pregunta';
import { ListaChequeoService } from '../../Servicios/lista-chequeo.service';
import { Mensajes } from '../../Servicios/mensajes';
import { ServicioPregunta } from '../../Servicios/pregunta.service';

@Component({
  selector: 'app-ver-chequeo',
  templateUrl: './ver-chequeo.component.html',
  styleUrls: ['./ver-chequeo.component.css']
})
export class VerChequeoComponent implements OnInit {

  @Input() listaChequeo: ListaChequeo;
  preguntas: Pregunta[] = [];
  constructor
  (
    public activeModal: NgbActiveModal,
    private servicioRespuesta: ListaChequeoService,
    private servicioPregunta: ServicioPregunta,
    private mensajes: Mensajes
  ) {for (let i = 1; i <= 9; i++) {this.preguntas.push(new Pregunta());}}

  ngOnInit(): void {
    this.InicializarPreguntas();
  }

  InicializarPreguntas() {
    this.servicioPregunta.Consultar("Lista de chequeo").subscribe(p => {
      if (!p.error) {
        this.preguntas = p.elementos;
      }
      else this.mensajes.Mostrar("Oh no", p.mensaje);
    });
  }
}
