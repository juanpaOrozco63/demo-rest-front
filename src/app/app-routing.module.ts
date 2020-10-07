import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path:'customers',component:CustomerListComponent},
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductListComponent},
  {path:'paymentMethod',component:PaymentMethodComponent},
  { path:'',pathMatch:'full',redirectTo:'home' },
  { path:'**',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
