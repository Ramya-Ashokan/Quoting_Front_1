import { Component } from '@angular/core';
import { NgForm, NonNullableFormBuilder } from '@angular/forms';
import { ProductservicesService } from 'src/app/Services/productservices.service';
import { Product, Products,Feature,Subscription,Location} from 'src/app/modules/Product';
import { productTypes,customerTypes, states,subscriptions ,productTypes1 } from 'src/app/modules/ProductList';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})


export class CreateProductComponent {
 newProduct:Products;
 productTypes=productTypes1;
 customerTypes=customerTypes;
features:Feature[]=[];
location=states;
sl:Location[]=[];
isProductAdded: boolean = false;

//selectedStates:String='';

subproduct=subscriptions ;
sp:Subscription[]=[];
//selectedsubproduct:String='';
selectedStates:any
  isProductNotAdded: boolean=false;
  constructor(private pService:ProductservicesService)
  {
    //this.features = [new Feature('')];  
  this.newProduct  =new Products('','','',this.features,'',NaN,this.sp,this.sl);

 //console.log(this.selectedStates);
  }
  onSelectionChange(state:any) {
    console.log(state);
  this.sl.unshift(state);
   
  }
  onSelectedSubProducts(sp:any){
    this.sp.unshift(sp);
  }

  onSubmit(form: NgForm) {
    
    this.pService.addProducts(this.newProduct).subscribe();
    //this.isProductAdded = true;
    const productAddedSuccessfully = false;
    if (!productAddedSuccessfully) {
      // Product added successfully
      this.isProductAdded = true;
    } else {
      // There was an error adding the product
      this.handleProductNotAddedError();
    }
     // Automatically clear the success message after 5 seconds
     setTimeout(() => {
      this.isProductAdded = false;
    }, 2000); // 5000 milliseconds (5 seconds)
    console.log('Product Submitted:', this.newProduct);

  }

  handleProductNotAddedError() {
    // Logic to handle product not added error
    // ...

    // Set isProductNotAdded to true to display the error message
    this.isProductNotAdded = true;

    // Automatically clear the error message after 5 seconds
    setTimeout(() => {
      this.clearMessages();
    }, 2000); // 5000 milliseconds (5 seconds)
  }

  clearMessages() {
    // Clear both success and error messages
    this.isProductAdded = false;
    this.isProductNotAdded = false;
  }
}



