import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListaChequeo } from '../../Modelos/lista-chequeo';
import { PeticionConsulta } from '../../Modelos/peticion';
import { ListaChequeoService } from '../../Servicios/lista-chequeo.service';
import { Mensajes } from '../../Servicios/mensajes';
import { SignalRServiceListaChequeo } from '../../Servicios/signal-r.service';
import { RegistroEncuestaChequeoComponent } from '../reg-lista-chequeo/reg-lista-chequeo.component';
import { VerChequeoComponent } from '../ver-chequeo/ver-chequeo.component';

@Component({
  selector: 'app-encuesta-restaurante',
  templateUrl: './encuesta-restaurante.component.html',
  styleUrls: ['./encuesta-restaurante.component.css']
})
export class EncuestaRestauranteComponent implements OnInit {

  dataSource;
  restauranteId: string;
  sedeId: number;
  columnsToDisplay = ['id', 'fecha', 'porcentaje','acciones'];
  peticion: PeticionConsulta<ListaChequeo> ;

  constructor(private modalService: NgbModal,
  private mensajes: Mensajes,private servicioEncuesta: ListaChequeoService,
  private route: ActivatedRoute, private signalRService: SignalRServiceListaChequeo) { }

  ngOnInit(): void {
    this.peticion = new PeticionConsulta();
    this.route.paramMap.subscribe(params => {
      this.restauranteId = params.get('restauranteId');
      var id = params.get('sedeId');
      this.sedeId = Number.parseInt(id);
    });
    this.Consultar();
    this.abrirConexionSignalR();
  }

  Consultar() {
    this.servicioEncuesta.Consultar(this.sedeId).subscribe(result => {
      if (result != null) {
        if (result.elementos.length > 0) {
          this.peticion = result;
          this.dataSource = new MatTableDataSource<ListaChequeo>(this.peticion.elementos);
        }
      }
    });
  }

  openModaRegistrolLista()
  {
    this.modalService.open(RegistroEncuestaChequeoComponent, { size: 'xl' }).
    componentInstance.sedeId = this.sedeId;
  }

  openModalLista(ListaChequeo : ListaChequeo)
  {
    this.modalService.open(VerChequeoComponent, { size: 'xl' }).
    componentInstance.listaChequeo = ListaChequeo;
  }

  abrirConexionSignalR() {
    this.signalRService.ListaChequeoReceived.subscribe((ListaChequeo: ListaChequeo) => {
      this.peticion.elementos.push(ListaChequeo);
      this.dataSource  = new MatTableDataSource<ListaChequeo>(this.peticion.elementos);
    });
  }
}
