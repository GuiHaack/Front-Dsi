import { Down_payments } from './../models/down_payments';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'searcherDateAdiantamento'
})
export class ProcurardateAdiantamento implements PipeTransform {

  transform(items: Down_payments[], procuraMinDate: string): Down_payments[] {

    if(!items) return[];
    if(!procuraMinDate) return items;

    return items.filter( it => {
      return moment.utc(it.date).format("MM YYYY") == moment.utc(procuraMinDate).format("MM YYYY");
    })
  }

}