import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { FormProductComponent } from './form-product/form-product.component';
import { FormUpdateCustomerComponent } from './form-update-customer/form-update-customer.component';

export const ROUTES: Routes = [
  {path:'customers',component:CustomerListComponent},
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductListComponent},
  {path:'paymentMethod',component:PaymentMethodComponent},
  {path:'customers/formCustomer',component:FormCustomerComponent},
  {path:'customers/formCustomer/:email',component:FormUpdateCustomerComponent},
  {path:'paymentMethod/formPaymentMethod',component:FormPaymentComponent},
  {path:'products/formProducts',component:FormProductComponent},
  { path:'',pathMatch:'full',redirectTo:'home' },
  { path:'**',pathMatch:'full',redirectTo:'home'}
];
