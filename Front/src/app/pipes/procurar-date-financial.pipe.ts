import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Entradas } from '../models/Entradas';

@Pipe({
  name: 'searcherMovDate'
})
export class Procurardate implements PipeTransform {

  transform(items: Entradas[], procuraMinDate: string): Entradas[] {

    if(!items) return[];
    if(!procuraMinDate) return items;

    return items.filter( it => {
      return moment.utc(it.data).format("MM YYYY") == moment.utc(procuraMinDate).format("MM YYYY");
    })
  }

}