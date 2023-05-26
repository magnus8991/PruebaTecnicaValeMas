import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Mensajes } from '../../Servicios/mensajes';
import { ServicioAutenticacion } from '../../Servicios/servicio-autenticacion.service';

@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl: './inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.css']
})
export class InicioDeSesionComponent implements OnInit {
  formularioInicioDeSesion: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private servicioAutenticacion: ServicioAutenticacion, private modalService: NgbModal,
    private mensajes: Mensajes
  ) {
    if (this.servicioAutenticacion.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.route.paramMap.subscribe(params => {
      if (params.get('cerrarSesion') == 'true') this.cerrarSesion();
    });
  }

  ngOnInit() {
    this.formularioInicioDeSesion = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    if (this.formularioInicioDeSesion.invalid) {
      return;
    }
    this.loading = true;
    this.servicioAutenticacion.iniciarSesion(this.nombreUsuario.value, this.contrasena.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.mensajes.Mostrar('Acceso Denegado', error.error);
          this.loading = false;
        });
  }

  cerrarSesion() {
    this.servicioAutenticacion.cerrarSesion();
    this.router.navigate(['/']);
  }

  get formulario() { return this.formularioInicioDeSesion.controls; }
  get nombreUsuario() { return this.formularioInicioDeSesion.get('nombreUsuario'); }
  get contrasena() { return this.formularioInicioDeSesion.get('contrasena'); }
}
