import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../../Modelos/restaurante';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroRestauranteComponent } from '../registro-restaurante/registro-restaurante.component';
import { Mensajes } from '../../Servicios/mensajes';
import { Peticion, PeticionConsulta } from '../../Modelos/peticion';
import { ActualizacionRestauranteComponent } from '../actualizacion-restaurante/act-restaurante.component';
import { ServicioRestaurante } from '../../Servicios/restaurante.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { SignalRServiceRestaurante } from '../../Servicios/signal-r.service';

@Component({
  selector: 'app-gestion-restaurante',
  templateUrl: './gestion-restaurante.component.html',
  styleUrls: ['./gestion-restaurante.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GestionRestauranteComponent implements OnInit {

  filtroRestaurante: string;
  peticion: PeticionConsulta<Restaurante>;
  dataSource;


  columnsToDisplay = ['Nit', 'NombreRestaurante', 'acciones'];
  expandedElement: Restaurante | null;

  constructor(private modalService: NgbModal, private servicioRestaurante: ServicioRestaurante,
  private mensajes: Mensajes, private signalRService: SignalRServiceRestaurante) { }

  ngOnInit(): void {
    this.peticion = new PeticionConsulta();
    this.Consultar();
    this.abrirConexionSignalR();
  }
  ObtenerNombreCompleto(restaurante : Restaurante)
  {
    return restaurante.propietario.nombres + " " + restaurante.propietario.primerApellido + " " + restaurante.propietario.segundoApellido;
  }
  Consultar() {
    this.servicioRestaurante.Consultar().subscribe(result => {
      if (result !=null) {
        this.peticion = result;
        this.dataSource = new MatTableDataSource<Restaurante>(this.peticion.elementos);
      }
      else this.mensajes.Mostrar("¡Oh, no!",result.mensaje);
    });
  }

  RegistrarRestaurante() {
    this.modalService.open(RegistroRestauranteComponent, {size: 'xl', backdrop: 'static', keyboard: false});
  }

  Modificar(nit: string) {
    const modelo = this.modalService.open(ActualizacionRestauranteComponent, {backdrop: 'static', keyboard: false});
     var restaurante = this.peticion.elementos.find(r => r.nit == nit);
     modelo.componentInstance.restaurante = restaurante;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirConexionSignalR() {
    this.signalRService.RestauranteReceived.subscribe((Restaurante: Restaurante) => {
      this.peticion.elementos.push(Restaurante);
      this.dataSource = new MatTableDataSource<Restaurante>(this.peticion.elementos);
    });
    this.signalRService.RestauranteModified.subscribe((Restaurante: Restaurante) => {
      var index = this.peticion.elementos.findIndex(s => s.nit == Restaurante.nit);
      this.peticion.elementos.splice(index,1);
      this.peticion.elementos.push(Restaurante);
      this.dataSource = new MatTableDataSource<Restaurante>(this.peticion.elementos);
    });
  }
}
