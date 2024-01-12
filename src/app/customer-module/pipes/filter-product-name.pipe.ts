import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProductName'
})
export class FilterProductNamePipe implements PipeTransform {

  transform(products: any[],  filterKeyword: string) {
    // if (!products || !filterKeyword) {
    //   return products;
    // }

  //   filterKeyword = filterKeyword.toLowerCase();
  //   return products.filter(product => {
  //     // Split the product name to extract the type
  //     const productNameParts = product.name.toLowerCase().split(' ');
  //     const productType = productNameParts[1].trim(); // Assuming type is the second part after splitting

  //     // Check if product name or type matches the filterKeyword
  //     return product.name.toLowerCase().includes(filterKeyword) ||
  //            productType === filterKeyword;
  //   });
  // }

  return products.filter((pro)=>pro.productName.includes(filterKeyword));
}
  }


