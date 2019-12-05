import { Pipe, PipeTransform } from '@angular/core';
import { Produtos } from '../models/produtos';

@Pipe({
  name: 'procurarProduto'
})
export class ProcurarProdutoPipe implements PipeTransform {

  transform(items: Produtos[], procuraPerson: string): Produtos[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.nome.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}