import { Down_payments } from './../models/down_payments';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcherNameD'
})
export class ProcurarPessoaDown implements PipeTransform {

  transform(items: Down_payments[], procuraPerson: string): Down_payments[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.name.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
