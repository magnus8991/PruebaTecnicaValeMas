import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Micro al Parque/Modelos/usuario';
import { ServicioAutenticacion } from '../Micro al Parque/Servicios/servicio-autenticacion.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  currentUser: Usuario;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

}