import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Micro al Parque/Modelos/usuario';
import { ServicioAutenticacion } from '../Micro al Parque/Servicios/servicio-autenticacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  currentUser: Usuario;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  gestionarRestaurantes() {
    if (this.currentUser) this.router.navigate(['/gestionRestaurante']);
    else this.router.navigate(['/login']);
  }

  realizarEncuesta() {
    if (this.currentUser) this.router.navigate(['/']);
    else this.router.navigate(['/login']);
  }

  verResultados() {
    if (this.currentUser) this.router.navigate(['/']);
    else this.router.navigate(['/login']);
  }

}
