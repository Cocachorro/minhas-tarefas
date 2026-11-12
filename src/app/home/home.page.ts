import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';

import type { Tarefa } from '../models/tarefa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Estudar TypeScript',
      concluido: false,
    },
    {
      id: 2,
      titulo: 'Fazer exercicios',
      concluido: false,
    },
    {
      id: 3,
      titulo: 'Dar commit no github',
      concluido: true,
    },
  ];
  constructor() {
    const objetos = this.tarefas.map((tarefa) => `Id: ${tarefa.id}\nTitulo: ${tarefa.titulo}\nConcluida: ${tarefa.concluido}`);
    const buscarObj = this.tarefas.find((tarefa) => tarefa.id === 2);
    if(buscarObj){
      console.log(buscarObj.titulo);
    }else {console.log("Não encontrado.");}
    console.log(objetos.join('\n'));
  }
}
