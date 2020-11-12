import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/Admin/home/Customer/customer-list/customer-list.component';
import { HomeAdminComponent } from './components/Admin/home/home.component';
import { PaymentMethodListComponent } from './components/Admin/home/PaymentMethod/payment-method-list/payment-method.component';
import { ProductListComponent } from './components/Admin/home/Product/product-list/product-list.component';
import { FormUpdateProductComponent } from './components/Admin/home/Product/form-update-product/form-update-product.component';
import { FormProductComponent } from './components/Admin/home/Product/form-product/form-product.component';
import { FormPaymentComponent } from './components/admin/home/paymentMethod/form-payment/form-payment.component';
import { FormUpdateCustomerComponent } from './components/Admin/home/Customer/form-update-customer/form-update-customer.component';
import { FormCustomerComponent } from './components/Admin/home/Customer/form-customer/form-customer.component';
import { FormUpdatePaymentMethodComponent } from './components/admin/home/paymentMethod/form-update-payment-method/form-update-payment-method.component';
import { LoginComponent } from './components/Shared/login/login.component';
import { RegisterComponent } from './components/Shared/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeNormalComponent } from './components/Normal/home/home.component';

export const ROUTES: Routes = [
  {path:'homeAdmin',component:HomeAdminComponent,canActivate:[AuthGuard]},
  {path:'homeNormal',component:HomeNormalComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ProductListComponent,canActivate:[AuthGuard]},
  {path:'products/formProduct',component:FormProductComponent,canActivate:[AuthGuard]},
  {path:'products/formProduct/:proId',component:FormUpdateProductComponent,canActivate:[AuthGuard] },
  {path:'customers',component:CustomerListComponent,canActivate:[AuthGuard]},
  {path:'customers/formCustomer',component:FormCustomerComponent,canActivate:[AuthGuard]},
  {path:'customers/formCustomer/:email',component:FormUpdateCustomerComponent,canActivate:[AuthGuard]},
  {path:'paymentMethod',component:PaymentMethodListComponent,canActivate:[AuthGuard]},
  {path:'paymentMethod/formPaymentMethod',component:FormPaymentComponent,canActivate:[AuthGuard]},
  {path:'paymentMethod/formPaymentMethod/:payId',component:FormUpdatePaymentMethodComponent,canActivate:[AuthGuard]},
  { path:'',pathMatch:'full',redirectTo:'login' },
  { path:'**',pathMatch:'full',redirectTo:'login'}
];
 