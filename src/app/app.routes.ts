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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ProductListComponent,canActivate:[AuthGuard]},
  {path:'products/formProduct',component:FormProductComponent,canActivate:[AuthGuard]},
  {path:'products/formProduct/:proId',component:FormUpdateProductComponent,canActivate:[AuthGuard] },
  {path:'customers',component:CustomerListComponent,canActivate:[AuthGuard]},
  {path:'customers/formCustomer',component:FormCustomerComponent,canActivate:[AuthGuard]},
  {path:'customers/formCustomer/:email',component:FormUpdateCustomerComponent,canActivate:[AuthGuard]},
  {path:'paymentMethod',component:PaymentMethodComponent,canActivate:[AuthGuard]},
  {path:'paymentMethod/formPaymentMethod',component:FormPaymentComponent,canActivate:[AuthGuard]},
  {path:'paymentMethod/formPaymentMethod/:payId',component:FormUpdatePaymentMethodComponent,canActivate:[AuthGuard]},
  { path:'',pathMatch:'full',redirectTo:'login' },
  { path:'**',pathMatch:'full',redirectTo:'login'}
];
 