import { ListasTrabalhores } from './../models/ListasTrabalhadores';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'searcherDateLista'
})
export class ProcurardateLista implements PipeTransform {

  transform(items: ListasTrabalhores[], procuraMinDate: string): ListasTrabalhores[] {

    if(!items) return[];
    if(!procuraMinDate) return items;

    return items.filter( it => {
      return moment.utc(it.data).format("MM YYYY") == moment.utc(procuraMinDate).format("MM YYYY");
    })
  }

}