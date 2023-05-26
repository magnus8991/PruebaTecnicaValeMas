import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ManipuladorDeAlimento } from "../../Modelos/manipulador-de-alimento";
import { Listados } from "../../Modelos/Listados";
import { Pregunta } from "../../Modelos/pregunta";
import { Respuesta } from "../../Modelos/respuesta";
import { ManipuladorService } from "../../Servicios/manipulador.service";
import { Mensajes } from "../../Servicios/mensajes";
import { ServicioPregunta } from "../../Servicios/pregunta.service";
import { RespuestaService } from "../../Servicios/respuesta.service";


@Component({
  selector: "app-act-manipulador",
  templateUrl: "./act-manipulador.component.html",
  styleUrls: ["./act-manipulador.component.css"],
})
export class ActualizacionManipuladorComponent implements OnInit {
  primerGrupoFormulario: FormGroup;
  @Input() manipuladorEntrante: ManipuladorDeAlimento;
  manipulador: ManipuladorDeAlimento;
  submitted = false;
  segundoGrupoFormulario: FormGroup;
  tercerGrupoFormulario: FormGroup;
  cuartoGrupoFormulario: FormGroup;
  isEditable = true;
  respuestas: Respuesta[] = [];
  preguntas: Pregunta[] = [];
  listados: Listados = new Listados();

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
    private servicioRespuesta: RespuestaService, private servicioPregunta: ServicioPregunta,
    private servicioManipulador: ManipuladorService, private mensajes: Mensajes
  ) {
    for (let i = 1; i <= 16; i++) {
      this.preguntas.push(new Pregunta()); this.respuestas.push(new Respuesta());
    }
  }

  ngOnInit(): void {
    this.EstablecerValidacionesFormulario();
    this.InicializarPreguntasYRespuestas();
    this.manipulador = this.manipuladorEntrante;
  }

  consultarRespuestas() {
    this.servicioRespuesta.Consultar(this.manipuladorEntrante.identificacion).subscribe(r => {
      if (!r.error) this.llenarRespuestas(r.elementos);
      else this.mensajes.Mostrar("Oh no, Ha sucedido un error!", r.mensaje);
    });
  }

  llenarRespuestas(respuestas: Respuesta[]) {
    let idCount = 1;
    for (let i=0;i<16;i++) {
      this.respuestas[i] = this.validarYAsignarValor(respuestas, idCount);
      idCount += 1;
    }
  }

  validarYAsignarValor(respuestas: Respuesta[], idCount: number): Respuesta {
    for (let i=0;i<16;i++) {
      if (respuestas[i].preguntaId == idCount) {
        return respuestas[i];
      }
    }
    return null;
  }

  InicializarPreguntasYRespuestas() {
    this.servicioPregunta.Consultar("Manipuladores").subscribe(p => {
      if (!p.error) {
        this.preguntas = p.elementos;
        this.consultarRespuestas();
      }
      else this.mensajes.Mostrar("Oh no", p.mensaje);
    });
  }

  ModificarManipulador() {
    this.servicioManipulador.Modificar(this.manipulador).subscribe((r) => {
      if (!r.error) {
        this.manipulador = r.elemento;
        this.ModificarRespuestas();
        this.mensajes.Mostrar("¡Operación exitosa!", r.mensaje);
        this.cerrar();
      } else this.mensajes.Mostrar("¡Oh no!", r.mensaje);
    });
  }

  ModificarRespuestas() {
    this.servicioRespuesta.Modificar(this.respuestas).subscribe((r) => {
      if (r.error) {
        this.mensajes.Mostrar("Oh no, Ha sucedido un error!", r.mensaje);
      }
    });
  }

  cerrar() { this.activeModal.close(null); }

  EstablecerValidacionesFormulario() {
    this.primerGrupoFormulario = this.formBuilder.group({
      identificacion: [{ value: '', disabled: true }, Validators.required],
      nombres: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      primerApellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      segundoApellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      sexo: ["", Validators.required],
      edad: [0, [Validators.required, Validators.min(18), Validators.max(120)]],
      paisDeProcedencia: ["", Validators.required],
      estadoCivil: ["", Validators.required],
      nivelEducativo: ["", Validators.required],
    });
    this.segundoGrupoFormulario = this.formBuilder.group({
      pregunta1: [, Validators.required],
      pregunta2: [, Validators.required],
      pregunta3: [, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      pregunta4: [, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      pregunta5: [, Validators.required],
      pregunta6: [, Validators.required]
    });
    this.tercerGrupoFormulario = this.formBuilder.group({
      pregunta7: ["", Validators.required],
      pregunta8: ["", Validators.required],
      pregunta9: ["", Validators.required],
      pregunta10: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      pregunta11: ["", Validators.required],
      pregunta12: ["", Validators.required]
    });
    this.cuartoGrupoFormulario = this.formBuilder.group({
      pregunta13: ["", Validators.required],
      pregunta14: ["", Validators.required],
      pregunta15: ["", Validators.required],
      pregunta16: ["", Validators.required]
    });
  }

  get identificacion() {
    return this.primerGrupoFormulario.get("identificacion");
  }
  get nombres() {
    return this.primerGrupoFormulario.get("nombres");
  }
  get primerApellido() {
    return this.primerGrupoFormulario.get("primerApellido");
  }
  get segundoApellido() {
    return this.primerGrupoFormulario.get("segundoApellido");
  }
  get sexo() {
    return this.primerGrupoFormulario.get("sexo");
  }
  get edad() {
    return this.primerGrupoFormulario.get("edad");
  }
  get paisDeProcedencia() {
    return this.primerGrupoFormulario.get("paisDeProcedencia");
  }
  get estadoCivil() {
    return this.primerGrupoFormulario.get("estadoCivil");
  }
  get nivelEducativo() {
    return this.primerGrupoFormulario.get("nivelEducativo");
  }


  get pregunta1() {
    return this.segundoGrupoFormulario.get("pregunta1");
  }
  get pregunta2() {
    return this.segundoGrupoFormulario.get("pregunta2");
  }
  get pregunta3() {
    return this.segundoGrupoFormulario.get("pregunta3");
  }
  get pregunta4() {
    return this.segundoGrupoFormulario.get("pregunta4");
  }
  get pregunta5() {
    return this.segundoGrupoFormulario.get("pregunta5");
  }
  get pregunta6() {
    return this.segundoGrupoFormulario.get("pregunta6");
  }

  get pregunta7() {
    return this.tercerGrupoFormulario.get("pregunta7");
  }
  get pregunta8() {
    return this.tercerGrupoFormulario.get("pregunta8");
  }
  get pregunta9() {
    return this.tercerGrupoFormulario.get("pregunta9");
  }
  get pregunta10() {
    return this.tercerGrupoFormulario.get("pregunta10");
  }
  get pregunta11() {
    return this.tercerGrupoFormulario.get("pregunta11");
  }
  get pregunta12() {
    return this.tercerGrupoFormulario.get("pregunta12");
  }

  get pregunta13() {
    return this.tercerGrupoFormulario.get("pregunta13");
  }
  get pregunta14() {
    return this.tercerGrupoFormulario.get("pregunta14");
  }
  get pregunta15() {
    return this.tercerGrupoFormulario.get("pregunta15");
  }
  get pregunta16() {
    return this.tercerGrupoFormulario.get("pregunta16");
  }

}
