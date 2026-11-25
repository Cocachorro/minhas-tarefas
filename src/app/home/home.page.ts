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
  AlertController,
} from '@ionic/angular';

import type { Tarefa } from '../models/tarefa';
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
  private tarefaService = inject(TarefaService); //Variavel de servico das tarefas
  private alertController = inject(AlertController); //Variavel de serviço de alerta.
  novoTitulo: string = ''; //Pega o texto de novo título
  tarefas = this.tarefaService.listarTarefas; //Busca as tarefas atuais
  tarefasPendentes = this.tarefaService.pendentes; //Busca as tarefas pendentes
  carregando = this.tarefaService.carregando; //Estado de carregando fake

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

  async removerCheck(tarefa: Tarefa, itemSliding: IonItemSliding): Promise<void> {
    const alert = await this.alertController.create({
      //Confere se vai apagar mesmo a tarefa
      header: 'Deseja mesmo excluir?',
      message: `${tarefa.titulo}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => itemSliding.close(),
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.tarefaService.remover(tarefa.id),
        },
      ],
    });
    await alert.present();
  }
}
