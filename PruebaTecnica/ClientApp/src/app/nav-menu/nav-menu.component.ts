import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Micro al Parque/Modelos/usuario';
import { ServicioAutenticacion } from '../Micro al Parque/Servicios/servicio-autenticacion.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  currentUser: Usuario;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }
}