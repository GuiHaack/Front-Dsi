import { Workers } from './../models/workers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcher'
})
export class ProcurarPessoaPipe implements PipeTransform {

  transform(items: Workers[], procuraPerson: string): Workers[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.name.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
