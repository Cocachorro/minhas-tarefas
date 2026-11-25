import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
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
    Haptics.impact({ style: ImpactStyle.Light });
    this.novoTitulo = '';
  }

  checar(idTarefa: number, estado: boolean): void {
    this.tarefaService.checar(idTarefa, estado);
    Haptics.impact({ style: ImpactStyle.Light });
  }

  async editar(tarefa: Tarefa, itemSliding: IonItemSliding): Promise<void> {
    const edit = await this.alertController.create({
      header: 'Editar Tarefa:',
      message: `${tarefa.id} - ${tarefa.titulo}`,
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: tarefa.titulo,
          placeholder: 'Novo titulo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => itemSliding.close(),
        },
        {
          text: 'Salvar',
          handler: (dados) => {
            const editou = this.tarefaService.editar(tarefa.id, dados.titulo);
            if (editou) {
              itemSliding.close();
              Haptics.impact({ style: ImpactStyle.Light });
            }
            return editou;
          },
        },
      ],
    });
    await edit.present();
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
          handler: () => {
            this.tarefaService.remover(tarefa.id);
            Haptics.notification({ type: NotificationType.Warning });
          },
        },
      ],
    });
    await alert.present();
  }
}
