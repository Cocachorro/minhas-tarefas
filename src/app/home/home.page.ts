import { Component, inject } from '@angular/core';
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

import { TarefaService } from '../services/tarefa.service';

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
  private tarefaService = inject(TarefaService);
  novoTitulo: string = '';

  tarefas = this.tarefaService.listarTarefas;

  tarefasPendentes = this.tarefaService.pendentes;

  addTarefa(): void {
    const registrou: boolean = this.tarefaService.adicionar(this.novoTitulo);
    if (!registrou) {
      alert('Adicione um titulo válido.');
      return;
    }
    this.novoTitulo = '';
  }

  checar(idTarefa: number, estado: boolean): void {
    this.tarefaService.checar(idTarefa, estado);
    }

  removerTarefa(idTarefa: number): void {
    this.tarefaService.remover(idTarefa);
  }

  
}
