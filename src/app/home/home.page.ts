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
  IonSpinner,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
} from '@ionic/angular';

import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonItemOptions,
    IonSpinner,
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
    IonItemSliding,
    IonItemOption,
  ],
})
export class HomePage {
  private tarefaService = inject(TarefaService);
  novoTitulo: string = '';

  tarefas = this.tarefaService.listarTarefas;
  carregando = this.tarefaService.carregando;

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
