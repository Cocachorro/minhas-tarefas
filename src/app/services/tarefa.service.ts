import { Service, signal, computed, inject } from '@angular/core';

import type { Tarefa } from '../models/tarefa';

import { TarefasStorageService } from './utils/tarefa.storage';

@Service()
export class TarefaService {
  //Arrays inicias
  private tarefasSig = signal<Tarefa[]>([
    //Array dos objetos de Tarefas em signal.
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
  ]);
  //Variáveis
  private tarefaStorage = inject(TarefasStorageService); //acesso a carregar e salvar tarefas
  private readonly CHAVE_TAREFAS: string = 'minhas_tarefas'; //Chave guardar dados no local
  private carregandoSig = signal<boolean>(true); //Boolean se ja carregou os dados.
  readonly listarTarefas = this.tarefasSig.asReadonly(); //Lista todas tareas do Array porém não altera.
  readonly carregando = this.carregandoSig.asReadonly(); //Ve como está porem não altera
  private idAtual: number = 0; //Variável que guarda o ultimo id usado.

  readonly pendentes = computed(() => {
    //Calcula quantas tarefas ainda estão pendentes
    const lista = this.tarefasSig();
    const qntpendentes = lista.filter((t) => !t.concluido);
    return qntpendentes.length;
  });
  //Métodos
  adicionar(novoTitulo: string): boolean {
    //Verifica se e uma tarefa valida e adiciona depois se for valida.
    const tituloTarefa: string = novoTitulo.trim();
    if (tituloTarefa === '') {
      return false;
    }
    const addTarefa: Tarefa = {
      id: ++this.idAtual,
      titulo: tituloTarefa,
      concluido: false,
    };
    this.tarefasSig.update((listaAtual) => [...listaAtual, addTarefa]);
    this.tarefaStorage.saveLocal(this.CHAVE_TAREFAS, this.tarefasSig());
    return true;
  }

  remover(idTarefa: number): void {
    //Remove uma tarefa do array com filter.
    this.tarefasSig.update((listaAtual) => listaAtual.filter((t) => t.id !== idTarefa));
    this.tarefaStorage.saveLocal(this.CHAVE_TAREFAS, this.tarefasSig());
  }

  checar(idTarefa: number, checado: boolean): void {
    //Checar se a tarefa ja foi concluida e mudar no array.
    this.tarefasSig.update((listaAtual) =>
      listaAtual.map((t) => {
        if (t.id === idTarefa) {
          return { ...t, concluido: checado };
        }
        return t;
      }),
    );
    this.tarefaStorage.saveLocal(this.CHAVE_TAREFAS, this.tarefasSig());
  }

  editar(idTarefa: number, novoTitulo: string): boolean {
    const tituloNovo = novoTitulo.trim();
    if (tituloNovo === '') {
      return false;
    }
    this.tarefasSig.update((lista) =>
      lista.map((t) => {
        if (t.id === idTarefa) {
          return { ...t, titulo: `${tituloNovo}` };
        }
        return t;
      }),
    );
    this.tarefaStorage.saveLocal(this.CHAVE_TAREFAS, this.tarefasSig());
    return true;
  }

  private async carregarDadosIni(): Promise<void> {
    const savedTarefas = await this.tarefaStorage.loadLocal(this.CHAVE_TAREFAS); //Tenta buscar a lista
    if (savedTarefas !== null) {
      //Verifica se tem algo na lista e se é válida antes de colocar no Signal
      this.tarefasSig.set(savedTarefas);
      this.idAtual = this.tarefaStorage.getId(savedTarefas);
    } else {
      this.idAtual = 3;
      this.tarefaStorage.saveLocal(this.CHAVE_TAREFAS, this.tarefasSig());
    }

    this.carregandoSig.set(false);
  }

  constructor() {
    this.carregarDadosIni();
  }
}
