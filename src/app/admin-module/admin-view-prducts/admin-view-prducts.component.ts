import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductservicesService } from 'src/app/Services/productservices.service';
import { Products } from 'src/app/modules/Product';

@Component({
  selector: 'app-admin-view-prducts',
  templateUrl: './admin-view-prducts.component.html',
  styleUrls: ['./admin-view-prducts.component.css']
})
export class AdminViewPrductsComponent {
  products:any;
  dProductId:any;
  successMessage:string='';

constructor(private pService:ProductservicesService,private router:Router)
{
this.pService.getProducts().subscribe((pList)=>{
this.products=pList;
console.log(this.products);
});

}
deleteById(productId:any)
{
  debugger;
  console.log(productId);
  this.successMessage='';
  this.pService.deleteById(productId).subscribe((response)=>{
    console.log("DELETE RESPONSE : "+response);
    if(response=='success')
    {
      this.successMessage="DeleteSuceessfully";
    }
      this.pService.getProducts().subscribe((pList)=>{
        this.products=pList;
        console.log(this.products);
        });
  });
  //this.successMessage="DeleteSuceesfully";
  // this.pService.getProducts().subscribe((pList)=>{
  //   this.products=pList;
  //   console.log(this.products);
  //   });
}
editById(productId:any)
{
  this.router.navigate(['/editproducts', productId]);
}
}
