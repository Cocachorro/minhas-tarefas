import { Service } from '@angular/core';

import type { Tarefa } from '../models/tarefa';

@Service()
export class TarefaService {
  //Arrays inicias
  private tarefas: Tarefa[] = [
    //Array dos objetos de Tarefas.
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

  //Variáveis
  private idAtual: number = 3; //Variável que guarda o ultimo id usado.

  //Métodos
  listarTarefas(): Tarefa[] {
    //lista todas tarefas atuais do array.
    return this.tarefas;
  }

  adicionar(novoTitulo: string): boolean {
    //Verifica se e uma tarefa valida e adiciona depois se for valida.
    const tituloTarefa: string = novoTitulo.trim();
    if (tituloTarefa === '') {
      return false;
    }
    this.tarefas.push({
      id: ++this.idAtual,
      titulo: tituloTarefa,
      concluido: false,
    });
    return true;
  }

  remover(idTarefa: number): void {
    //Remove uma tarefa do array com filter.
    this.tarefas = this.tarefas.filter((t) => t.id !== idTarefa);
  }

  pendentes(): number {
    //Tarefas pendentes
    const pendentes = this.tarefas.filter((t) => !t.concluido);
    return pendentes.length;
  }

  checar(idTarefa: number, checado: boolean): void {
    //Checar se a tarefa ja foi concluida e mudar no array.
    const tarefa = this.tarefas.find((t) => t.id === idTarefa);
    if (tarefa) {
      tarefa.concluido = checado;
    }
  }
}
