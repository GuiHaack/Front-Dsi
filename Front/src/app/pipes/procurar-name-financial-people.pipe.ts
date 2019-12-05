import { Entradas } from './../models/entradas';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcherP'
})
export class ProcurarPessoaNome implements PipeTransform {

  transform(items: Entradas[], procuraPerson: string): Entradas[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.pessoa.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
