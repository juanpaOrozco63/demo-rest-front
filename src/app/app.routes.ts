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
import { AuthAdminGuard } from './guards/authAdmin.guard';
import { HomeNormalComponent } from './components/Normal/home/home.component';
import { ShoppingProductListComponent } from './components/Admin/home/ShoppingProduct/shopping-product-list/shopping-product-list.component';
import { FormShoppingProductComponent } from './components/Admin/home/ShoppingProduct/form-shopping-product/form-shopping-product.component';
import { FormUpdateShoppingProductComponent } from './components/Admin/home/ShoppingProduct/form-update-shopping-product/form-update-shopping-product.component';
import { AuthNormalGuard } from './guards/auth-normal.guard';
import { ShoppingCartListComponent } from './components/Admin/home/ShoppingCart/shopping-cart-list/shopping-cart-list.component';
import { FormShoppingCartComponent } from './components/Admin/home/ShoppingCart/form-shopping-cart/form-shopping-cart.component';
import { FormUpdateShoppingCartComponent } from './components/Admin/home/ShoppingCart/form-update-shopping-cart/form-update-shopping-cart.component';
import { StoreComponent } from './components/Normal/home/Store/store/store.component';
import { PurchaseDetailComponent } from './components/Normal/home/purchase-detail/purchase-detail.component';

export const ROUTES: Routes = [
  // Admin
  {path:'homeAdmin',component:HomeAdminComponent,canActivate:[AuthAdminGuard]},
  {path:'products',component:ProductListComponent,canActivate:[AuthAdminGuard]},
  {path:'products/formProduct',component:FormProductComponent,canActivate:[AuthAdminGuard]},
  {path:'products/formProduct/:proId',component:FormUpdateProductComponent,canActivate:[AuthAdminGuard] },
  {path:'customers',component:CustomerListComponent,canActivate:[AuthAdminGuard]},
  {path:'customers/formCustomer',component:FormCustomerComponent,canActivate:[AuthAdminGuard]},
  {path:'customers/formCustomer/:email',component:FormUpdateCustomerComponent,canActivate:[AuthAdminGuard]},
  {path:'paymentMethod',component:PaymentMethodListComponent,canActivate:[AuthAdminGuard]},
  {path:'paymentMethod/formPaymentMethod',component:FormPaymentComponent,canActivate:[AuthAdminGuard]},
  {path:'paymentMethod/formPaymentMethod/:payId',component:FormUpdatePaymentMethodComponent,canActivate:[AuthAdminGuard]},
  {path:'shoppingProduct',component:ShoppingProductListComponent,canActivate:[AuthAdminGuard]},
  {path:'shoppingProduct/formShoppingProduct',component:FormShoppingProductComponent,canActivate:[AuthAdminGuard]},
  {path:'shoppingProduct/formShoppingProduct/:shprId',component:FormUpdateShoppingProductComponent,canActivate:[AuthAdminGuard]},
  {path:'shoppingCart',component:ShoppingCartListComponent,canActivate:[AuthAdminGuard]},
  {path:'shoppingCart/formShoppingCart',component:FormShoppingCartComponent,canActivate:[AuthAdminGuard]},
  {path:'shoppingCart/formShoppingCart/:carId',component:FormUpdateShoppingCartComponent,canActivate:[AuthAdminGuard]},
  // Normal
  {path:'homeNormal',component:HomeNormalComponent,canActivate:[AuthNormalGuard]},
  {path:'store',component:StoreComponent,canActivate:[AuthNormalGuard]},
  {path:'purchaseDetail/:email',component:PurchaseDetailComponent,canActivate:[AuthNormalGuard]},
  // Shared
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path:'',pathMatch:'full',redirectTo:'login' },
  { path:'**',pathMatch:'full',redirectTo:'login'}
];
 