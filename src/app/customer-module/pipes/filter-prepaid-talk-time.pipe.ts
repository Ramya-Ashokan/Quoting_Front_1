import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrepaidTalkTime'
})
export class FilterPrepaidTalkTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
