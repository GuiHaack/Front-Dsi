import { Down_payments } from './../models/down_payments';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcherFuncionario'
})
export class ProcurarFuncionarioPipe implements PipeTransform {

  transform(items: Down_payments[], procuraPerson: number): Down_payments[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    return items.filter( it => {
      return it.worker_id == procuraPerson;
    })
  }
}
