import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonList,
  IonLabel,
  IonCheckbox,
  IonInput,
  IonButton,
} from '@ionic/angular';

import type { Tarefa } from '../models/tarefa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonCheckbox,
    IonInput,
    IonButton,
    FormsModule,
  ],
  /*cosnegui reproduzir o erro equecendo de importar label, ja fica errado parece que nao carrega*/
  //✘ [ERROR] NG8002: Can't bind to 'ngModel' since it isn't a known property of 'ion-input'.
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

  novoTitulo: string = '';

  idAtual: number = 3;

  adicionar(): void {
    //console.log(`O título digitado foi: ${this.novoTitulo}`);
    const tituloTarefa: string = this.novoTitulo.trim();
    if (tituloTarefa === '') {
      return console.log('O titulo está vazio, coloque um título válido');
    }
    this.tarefas.push({
      id: ++this.idAtual, //idAtual guarda o último id usado; o ++ sobe antes de usar, então o id nunca se repete
      titulo: tituloTarefa,
      concluido: false,
    });
    this.novoTitulo = '';
  }

  aoChecar(idTarefa: number, checado: boolean): void {
    const tarefa = this.tarefas.find((t) => t.id === idTarefa);
    if (tarefa) {
      tarefa.concluido = checado;
    }
  }

  get tarefasPendentes(): number {
    const pendentes = this.tarefas.filter((t) => !t.concluido);
    return pendentes.length;
  }

  removerTarefa(idTarefa: number): void {
    this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== idTarefa);
  }

  constructor() {}
}
