import { Injectable, Inject, EventEmitter } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ManipuladorDeAlimento } from '../Modelos/manipulador-de-alimento';
import { Sede } from '../Modelos/sede';
import { Restaurante } from '../Modelos/restaurante';
import { ListaChequeo } from '../Modelos/lista-chequeo';

@Injectable({
  providedIn: 'root'
})
export abstract class SignalRService {
  hubConnection: signalR.HubConnection;
  RestauranteReceived = new EventEmitter<Restaurante>();
  RestauranteModified = new EventEmitter<Restaurante>();
  SedeReceived = new EventEmitter<Sede>();
  SedeModified = new EventEmitter<Sede>();
  ManipuladorReceived = new EventEmitter<ManipuladorDeAlimento>();
  ManipuladorModified = new EventEmitter<ManipuladorDeAlimento>();
  ListaChequeoReceived = new EventEmitter<ListaChequeo>();
  baseUrl: string;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + "signalHub") //use your api adress here and make sure you use right hub name.
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        //if you get error try to start connection again after 3 seconds.
        setTimeout(function () {
          this.startConnection();
        }, 3000);
      });
  };

  abstract registerSignalEvents(): void;
}

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceRestaurante extends SignalRService {
  registerSignalEvents() {
    this.hubConnection.on("RestauranteRegistrado", (data: Restaurante) => {
      this.RestauranteReceived.emit(data);
    });
    this.hubConnection.on("RestauranteModificado", (data: Restaurante) => {
      this.RestauranteModified.emit(data);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceSede extends SignalRService {
  registerSignalEvents() {
    this.hubConnection.on("SedeRegistrada", (data: Sede) => {
      this.SedeReceived.emit(data);
    });
    this.hubConnection.on("SedeModificada", (data: Sede) => {
      this.SedeModified.emit(data);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceManipulador extends SignalRService {
  registerSignalEvents() {
    this.hubConnection.on("ManipuladorRegistrado", (data: ManipuladorDeAlimento) => {
      this.ManipuladorReceived.emit(data);
    });
    this.hubConnection.on("ManipuladorActualizado", (data: ManipuladorDeAlimento) => {
      this.ManipuladorModified.emit(data);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceListaChequeo extends SignalRService {
  registerSignalEvents() {
    this.hubConnection.on("ListaChequeoRegistrada", (data: ListaChequeo) => {
      this.ListaChequeoReceived.emit(data);
    });
  }
}