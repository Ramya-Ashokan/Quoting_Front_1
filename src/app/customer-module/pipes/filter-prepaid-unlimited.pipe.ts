import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrepaidUnlimited'
})
export class FilterPrepaidUnlimitedPipe implements PipeTransform {

  transform(products: any[],  filterUnimited: string) {


  return products.filter((pro)=>pro.productName.includes(filterUnimited));
}
}
