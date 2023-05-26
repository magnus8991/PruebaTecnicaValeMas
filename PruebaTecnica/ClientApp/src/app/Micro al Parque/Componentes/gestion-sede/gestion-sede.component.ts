import { Component, Input, OnInit } from '@angular/core';
import { Sede } from '../../Modelos/sede';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroSedeComponent } from '../registro-sede/registro-sede.component';
import { Mensajes } from '../../Servicios/mensajes';
import { Peticion, PeticionConsulta } from '../../Modelos/peticion';
import { ActualizacionSedeComponent } from '../actualizacion-sede/actualizacion-sede.component';
import { ServicioSede } from '../../Servicios/sede.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SignalRServiceSede } from '../../Servicios/signal-r.service';

@Component({
  selector: 'app-gestion-sede',
  templateUrl: './gestion-sede.component.html',
  styleUrls: ['./gestion-sede.component.css']
})
export class GestionSedeComponent implements OnInit {
  filtroSede: string;
  peticion: PeticionConsulta<Sede>;
  dataSource;
  IdRestaurante;

  columnsToDisplay = ['IdDeLaSede', 'Nombre','Direccion','Telefono','acciones'];
  expandedElement: Sede | null;

  constructor(private modalService: NgbModal, private servicioSede: ServicioSede,
    private mensajes: Mensajes, private route: ActivatedRoute,
    private signalRService: SignalRServiceSede) { }

  ngOnInit(): void {
    this.peticion = new PeticionConsulta();
    this.route.paramMap.subscribe(params => {
      this.IdRestaurante = params.get('restauranteId');
    });
    this.Consultar();
    this.abrirConexionSignalR();
  }

  Consultar() {
    this.servicioSede.Consultar(this.IdRestaurante).subscribe(result => {
      if (result != null) {
        this.peticion = result;
        this.dataSource = new MatTableDataSource<Sede>(this.peticion.elementos);
      }
      else this.mensajes.Mostrar("¡Oh, no!", result.mensaje);
    });
  }

  RegistrarSede() {
    const modelo = this.modalService.open(RegistroSedeComponent, { size: 'xl', backdrop: 'static', keyboard: false });
    modelo.componentInstance.NIT = this.IdRestaurante;
    modelo.result.then(s => {
      if (s != null) {
        var sede: Sede = s;
        if (sede.nombre != undefined) {
          var contador = 0;
          this.peticion.elementos.forEach(sedeLista => {
            if (sedeLista.nombre == sede.nombre) contador += 1;
          });
          if (contador > 0) this.mensajes.Mostrar("¡Cuidado!", "La Sede " + sede.nombre + " ya está agregada");
          else {
            this.GuardarSede(sede);
          }
        }
      }
    });
  }

  GuardarSede(Sede: Sede) {
    this.servicioSede.Guardar(Sede).subscribe(result => {
      if (!result.error) {
        this.mensajes.Mostrar("¡Operacion exitosa!",result.mensaje);
      }
      else this.mensajes.Mostrar("¡Oh no!",result.mensaje);
    });
  }

  Modificar(id: number) {
    const modelo = this.modalService.open(ActualizacionSedeComponent, { size: 'xl' });
    var Sede = this.peticion.elementos.find(s => s.sedeId == id);
    modelo.componentInstance.Sede = Sede;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirConexionSignalR() {
    this.signalRService.SedeReceived.subscribe((sede: Sede) => {
      this.peticion.elementos.push(sede);
      this.dataSource = new MatTableDataSource<Sede>(this.peticion.elementos);
    });
    this.signalRService.SedeModified.subscribe((sede: Sede) => {
      var index = this.peticion.elementos.findIndex(s => s.sedeId == sede.sedeId);
      this.peticion.elementos.splice(index,1);
      this.peticion.elementos.push(sede);
      this.dataSource = new MatTableDataSource<Sede>(this.peticion.elementos);
    });
  }
}
