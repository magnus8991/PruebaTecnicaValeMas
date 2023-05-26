import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HandleHttpErrorService } from "../../@base/handle-http-error.service";
import { Usuario } from "../Modelos/usuario";

@Injectable({
    providedIn: 'root'
})
export class ServicioAutenticacion {
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;
    baseUrl: string;

    constructor(
        private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
        private handleErrorService: HandleHttpErrorService) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.baseUrl = baseUrl;
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    iniciarSesion(nombreUsuario, contrasena) {
        return this.http.post<any>(this.baseUrl + 'api/Login', { nombreUsuario, contrasena })
            .pipe(map(usuario => {
                localStorage.setItem('currentUser', JSON.stringify(usuario));
                this.currentUserSubject.next(usuario);
                return usuario;
            }));
    }

    cerrarSesion() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}