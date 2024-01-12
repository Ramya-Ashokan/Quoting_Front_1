import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrepaidData'
})
export class FilterPrepaidDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
