import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductservicesService } from 'src/app/Services/productservices.service';
import { Product ,Location, Products} from 'src/app/modules/Product';
import { ptypes,locations, states } from 'src/app/modules/ProductList';
import { Quote } from 'src/app/modules/Quote';
import Swal from 'sweetalert2';


interface ProductCategory {
  categoryName: string;
  productsList:Products[];
}



@Component({
  selector: 'app-customer-view-products',
  templateUrl: './customer-view-products.component.html',
  styleUrls: ['./customer-view-products.component.css']
})
export class CustomerViewProductsComponent implements OnInit{
//products:Product[]=[];
selectedProducts:Products[]=[];
ptypes=ptypes;
locations=locations;
//location:any='All';
ptype:any='All';
successMessage:string='';


//new
selectedLocation:any;
states=states;
location:any;
products:any;
allLocation:Location[]=[];
selectedPlanType:any='All';
  errorMessage: string='';
  //quote:Quote;
  quantity=1;
  subscription:any;
  quoteObject:any;
   registerState=JSON.parse(localStorage.getItem('registerState')+'');
  userState: string | null;
  filterKeyword:any="Prepaid Data";
  filterTalkTime:any="Prepaid TalkTime";
  filterUnimited:any="Prepeaid Unlimited";
  filterData:any="Prepaid Data";




//filter
filteredProducts: ProductCategory[] = [];
showPrepaidButton: boolean = false;
showPostpaidButton: boolean = false;
//planType:any="Prepaid";
//planType2:any;



 //selectedLocationName: string; // Declare a variable to store the selected location name this.selectedLocationName = this.location.locationName;
constructor(private pService:ProductservicesService,private router:Router)
{
  this.userState = localStorage.getItem('userState');
  console.log(this.userState);
  //this.selectedLocation=this.userState;
  //this.pService.getProduct().subscribe((pro:any)=>{this.proList=pro});


  // this.pService.getAllLocation().subscribe((locationList:any)=>{this.allLocation=locationList});
  // console.log("Location List",this.allLocation);
  // this.pService.getProducts().subscribe((pList:any)=>{this.products=pList});
  // console.log(location);
  // console.log(this.products);

  //this.view();

}
// view(){
//   this.products=this.pService.getProducts();
// }

// change(plan:any)
// {
//  this.planType=this.planType2;
//  console.log(plan);
// }
ngOnInit(): void {
  this.pService.getAllLocation().subscribe((locationList:any) => {
    this.allLocation = locationList;
    console.log("Location List", this.allLocation);
  });
   const regLocationName=JSON.parse(localStorage.getItem('registerState')+'');
// this.pService.getProductsByDefaultLocation(regLocationName).subscribe((pList:any)=>{
//   this.products=pList;



//this.initializeUserState();

  //  current location
  this.userState = localStorage.getItem('userState');
  console.log(this.userState);
  this.selectedLocation=this.userState;
  this.pService.getProductsByDefaultLocation(this.userState).subscribe((pList:any)=>{
    this.products=pList;
    console.log("current localation products",this.products);
    
    //this.onLocationSelect();
   // this.onProductTypeSelect();
    //this.initializeFilteredProducts(this.products);
});
  // this.pService.getProducts().subscribe((pList:any) => {
  //   this.products = pList;
  //   console.log(this.products);
  // });
  
}


initializeUserState(): void {
  // Fetch user state from your data source or wherever it's stored
  // For example, if userState is stored in a variable called userStateVariable:
  // this.selectedLocation = userStateVariable;
  
  // Alternatively, if user state is stored in localStorage:
  const userState = localStorage.getItem('userState');
  this.selectedLocation = userState ? userState : null;
}










addQuote(product:any)
{
  

  const email=JSON.parse(localStorage.getItem('email')+'');


 // Extract subscription names from the list of location objects

const subscriptionNames: any[] = product.subscriptions.map((subscription: { subscriptionName: any; }) => subscription.subscriptionName);
const locationNames:any[]=product.locations.map((location:{locationName:any;})=>location.locationName);
// Join the location names into a single string (if you want to store them as a comma-separated string)
const subscriptionString = subscriptionNames.join(', ');
const locationString=locationNames.join(', ');
   const quote=new Quote(email,product.productId,product.productName,product.productType,product.customerType,product.features,product.validity,product.price,subscriptionNames,locationNames,this.quantity,product.price);
  //this.pService.addQuote(quote).subscribe((quoteObj: any)=>{this.quoteObject=quoteObj});
  // this.selectedProducts=this.pService.getQuote();
 
  this.pService.addQuote(quote).subscribe(
    (quoteObj: any) => {
      this.quoteObject = quoteObj;
      Swal.fire({
        title: 'Quote Requested!',
        text: 'choosed plan added to quote list successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
    (error: any) => {
      console.error('Error adding quote:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to request a quote. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
}

onLocationSelect()
{
  this.errorMessage = ''; 
localStorage.setItem('currentLocation',JSON.stringify(this.selectedLocation));
  console.log("hi");
  console.log(this.selectedLocation);
  if(this.selectedPlanType==='Wired' || this.selectedPlanType==='Wireless') {
    
    this.pService.getProductsByProductType(this.selectedLocation,  this.selectedPlanType).subscribe((pList:any)=>{
      console.log("Products received:", pList);
      if (pList && pList.length > 0) {
        this.products = pList;
        //this.initializeFilteredProducts(this.products);
      } else {
        this.products = []; // Set products to an empty array if the response is empty
        this.errorMessage = 'No plans available for the selected plan type.';
      }
    });
  }else{
    this.pService.getProductsByLocationId(this.selectedLocation).subscribe((pList:any)=>{
      //this.products=pList
      if (pList && pList.length > 0) {
        this.products = pList;
        console.log("selected location",this.selectedLocation,  this.products);
        //this.initializeFilteredProducts(this.products);
      } else {
        //this.initializeFilteredProducts(this.products);
        this.products = []; // Set products to an empty array if the response is empty
        this.errorMessage = 'No plans available for the selected plan type.';
      }
    });
  }
console.log(this.products);
} 
r : Location[] = states;
i:number=0;

onProductTypeSelect()
{
  this.errorMessage = ''; // Clear the error message before making the API call
  this.products=[];
  console.log(this.selectedLocation);
    console.log(this.userState);
    
    console.log(this.r)
    for(this.i=0;this.i<this.r.length;this.i++){
      if(this.r[this.i].locationName === this.selectedLocation){
        this.selectedLocation = this.r[this.i].locationId;
        break;
      }
    }
    

   if(this.selectedPlanType==='Wired' || this.selectedPlanType==='Wireless') {
    this.pService.getProductsByProductType(this.selectedLocation,  this.selectedPlanType).subscribe((pList:any)=>{
      console.log("Products received:", pList);


      if (pList && pList.length > 0) {
        this.products = pList;
        //this.initializeFilteredProducts(this.products);
      } else {
       
       // this.initializeFilteredProducts(this.products);
        this.products = []; // Set products to an empty array if the response is empty
        this.errorMessage = 'No plans available for the selected plan type and Location.';
      }
    },
      

      
      (error:any)=>
      {
        console.error('Error fetching products:', error);
     
       
          this.products = []; // Set products to an empty array in case of error
          this.errorMessage = 'No plans available for the selected plan type and location.';
    } );
    this.errorMessage = '';
  }
  if(this.selectedPlanType==='All')
  {
    this.onLocationSelect();
    //this.initializeFilteredProducts(this.products);
    //this.products = []; // Set products to an empty array if the response is empty

  }

  // Determine visibility of prepaid and postpaid buttons based on selected product type
 // this.showPrepaidButton = this.selectedPlanType === 'All' || this.selectedPlanType === 'Wireless';
  //this.showPostpaidButton = this.selectedPlanType === 'All' || this.selectedPlanType === 'Wired';
}





// initializeFilteredProducts(products: any[]): ProductCategory[]{
//   this.filteredProducts = [];
 
//   if (products && products.length > 0) {
  
//   products=this.products;
//   console.log("filter ",products);
 
//   const prepaidUnlimitedProducts = products.filter(product => product.productName.includes('Prepaid Unlimited'));
//   const prepaidDataProducts =products.filter(product=> product.productName.includes('Prepaid Data'));
//   const prepaidTalktimeProducts = products.filter(product =>product.productName.includes('Prepaid TalkTime'));
// console.log("data",prepaidDataProducts);
// console.log("unlimited",prepaidUnlimitedProducts);
// console.log("talktime",prepaidTalktimeProducts);
//    this.filteredProducts = [
//     { categoryName: 'Prepaid Unlimited', productsList: prepaidUnlimitedProducts },
//     { categoryName: 'Prepaid Data', productsList: prepaidDataProducts },
//     { categoryName: 'Prepaid Talktime', productsList: prepaidTalktimeProducts }
//   ];
// }

// else {
//   this.errorMessage = 'No plans available for the selected plan type and location.';
// }

// return this.filteredProducts;

// }




//split by space in product name
extractProductName(productName: string): string {
  const firstPart = productName.split(' ')[0];
  return firstPart;
}



}


  // const quote:Quote={pname,price,term};
  // this.router.navigate(['/quote',quote]);
  // this.selectedProducts.push(product);
  //  this.router.navigate(['/quote'], { state: { selectedProducts: this.selectedProducts } })
  // this.successMessage='Added to QuoteList';