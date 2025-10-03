import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

      this.hubConnection!.on('UpdateNbUsers', (data: number) => {
        // data a le même type que ce qui a été envoyé par le serveur
        this.nbUsers = data;
        console.log(data);
    });

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
     this.hubConnection
    .start()
    .then(() => {
      console.log('Connecté au hub.');
      this.isConnected = true; // ✅ Seulement après une connexion réussie
    })
    .catch(err => console.error('Erreur de connexion au hub:', err));
  }

  selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;
  }

  unselectChoice() {
    this.selectedChoice = -1;
  }

  addMoney() {
  }

  buyPizza() {
  }
}
