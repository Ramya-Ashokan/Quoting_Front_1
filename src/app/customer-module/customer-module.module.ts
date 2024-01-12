import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerModuleRoutingModule } from './customer-module-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerViewProductsComponent } from './customer-view-products/customer-view-products.component';
import { QuotingListComponent } from './quoting-list/quoting-list.component';
import { FormsModule } from '@angular/forms';
import { FilterByLocationPipe } from './pipes/filter-by-location.pipe';
import { FilterByTypePipe } from './pipes/filter-by-type.pipe';
import { CustomerLogoutComponent } from './customer-logout/customer-logout.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { FilterProductNamePipe } from './pipes/filter-product-name.pipe';
import { FilterPrepaidUnlimitedPipe } from './pipes/filter-prepaid-unlimited.pipe';
import { FilterPrepaidDataPipe } from './pipes/filter-prepaid-data.pipe';
import { FilterPrepaidTalkTimePipe } from './pipes/filter-prepaid-talk-time.pipe';
// import { FooterComponent } from '../footer/footer.component';
//import { FooterComponent } from '../footer/footer.component';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

// @NgModule({
//   imports: [
//     // ...
//     // MatSnackBarModule,
//     // ...
  
//   ],
//   declarations: [
   
//   ],
//   // ...
// })
export class AppModule { }

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerViewProductsComponent,
    QuotingListComponent,FilterByLocationPipe,FilterByTypePipe, CustomerLogoutComponent,
    SearchProductsComponent,
    FilterProductNamePipe,
    FilterPrepaidUnlimitedPipe,
    FilterPrepaidDataPipe,
    FilterPrepaidTalkTimePipe
  ],
  imports: [
    CommonModule,
    CustomerModuleRoutingModule,FormsModule
  ]
})
export class CustomerModuleModule { 
 
 

}
