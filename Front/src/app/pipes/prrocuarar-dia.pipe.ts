import { Down_payments } from '../models/down_payments';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'searcherDiaAdiantamento'
})
export class ProcurardiaAdiantamento implements PipeTransform {

  transform(items: Down_payments[], procuraMinDate: string): Down_payments[] {

    if(!items) return[];
    if(!procuraMinDate) return items;

    return items.filter( it => {
      return moment.utc(it.date).format("dd MM YYYY") == moment.utc(procuraMinDate).format("dd MM YYYY");
    })
  }

}