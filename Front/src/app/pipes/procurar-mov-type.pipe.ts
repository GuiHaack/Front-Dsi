import { Entradas } from './../models/entradas';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcher_mov'
})
export class ProcurarMovPipe implements PipeTransform {

  transform(items: Entradas[], procuraMov: string): Entradas[] {

    if(!items) return[];
    if(!procuraMov) return items;
    
    return items.filter( it => {
      return it.tipo == procuraMov;
    })
  }

}