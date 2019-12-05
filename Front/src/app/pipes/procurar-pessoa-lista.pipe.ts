import { ListasTrabalhores } from './../models/ListasTrabalhadores';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcherListaPessoa'
})
export class ProcurarPessoaListaPipe implements PipeTransform {

  transform(items: ListasTrabalhores[], procuraPerson: string): ListasTrabalhores[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.name.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
