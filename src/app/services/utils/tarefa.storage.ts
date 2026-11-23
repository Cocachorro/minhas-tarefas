import { Service } from '@angular/core';

import type { Tarefa } from '../../models/tarefa';

@Service()
export class TarefasStorageService {
  loadLocal(chave: string): Tarefa[] | null {
    //Busca a lista salva se tiver nos arquivos locais.
    const dadosTxtLocais = localStorage.getItem(chave);
    if (dadosTxtLocais === null) return null;
    try {
      const dadosObjArray: Tarefa[] = JSON.parse(dadosTxtLocais);
      return dadosObjArray;
    } catch (erro) {
      console.error('Erro ao ler dados salvos: ', erro);
      return null;
    }
  }

  saveLocal(chave: string, listaTarefas: Tarefa[]): void {
    //Tranforma em string para conseguior salvar para JSON nos arquivos locais.
    const dadosString = JSON.stringify(listaTarefas);
    localStorage.setItem(chave, dadosString);
  }

  getId(lista: Tarefa[]): number {
    //Confere qual o id mais atual na lista atualizada
    const valorIdLocal = lista.reduce((valorIni, tarefa) => {
      if (valorIni < tarefa.id) {
        return tarefa.id;
      }
      return valorIni;
    }, 0);
    return valorIdLocal;
  }
}
