import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormUpdateProductComponent } from './components/form-update-product/form-update-product.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { FormUpdateCustomerComponent } from './components/form-update-customer/form-update-customer.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { FormUpdatePaymentMethodComponent } from './components/form-update-payment-method/form-update-payment-method.component';

export const ROUTES: Routes = [
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductListComponent},
  {path:'products/formProduct',component:FormProductComponent},
  {path:'products/formProduct/:proId',component:FormUpdateProductComponent },
  {path:'customers',component:CustomerListComponent},
  {path:'customers/formCustomer',component:FormCustomerComponent},
  {path:'customers/formCustomer/:email',component:FormUpdateCustomerComponent},
  {path:'paymentMethod',component:PaymentMethodComponent},
  {path:'paymentMethod/formPaymentMethod',component:FormPaymentComponent},
  {path:'paymentMethod/formPaymentMethod/:payId',component:FormUpdatePaymentMethodComponent},
  { path:'',pathMatch:'full',redirectTo:'home' },
  { path:'**',pathMatch:'full',redirectTo:'home'}
];
 