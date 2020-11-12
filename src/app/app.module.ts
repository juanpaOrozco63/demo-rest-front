// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
// Rutas
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

// Componentes
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/Admin/home/Customer/customer-list/customer-list.component';
import { NavBarAdminComponent } from './components/shared/nav-bar-admin/nav-bar.component';
import { HomeAdminComponent } from './components/Admin/home/home.component';
import { HomeNormalComponent } from './components/Normal/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProductListComponent } from './components/Admin/home/Product/product-list/product-list.component';
import { PaymentMethodListComponent } from './components/Admin/home/PaymentMethod/payment-method-list/payment-method.component';
import { FormUpdateProductComponent } from './components/Admin/home/Product/form-update-product/form-update-product.component';
import { FormCustomerComponent } from './components/Admin/home/Customer/form-customer/form-customer.component';
import { FormProductComponent } from './components/Admin/home/Product/form-product/form-product.component';
import { FormPaymentComponent } from './components/admin/home/paymentMethod/form-payment/form-payment.component';
import { FormUpdateCustomerComponent } from './components/Admin/home/Customer/form-update-customer/form-update-customer.component';
import { FormUpdatePaymentMethodComponent } from './components/admin/home/paymentMethod/form-update-payment-method/form-update-payment-method.component';
// Http
import {HttpClientModule} from '@angular/common/http';
// Ngm install
import {NgxPaginationModule} from 'ngx-pagination';
import { NgFallimgModule } from 'ng-fallimg';
import { PhonePipe } from './pipes/phone.pipe';
import { LoginComponent } from './components/Shared/login/login.component';
import { RegisterComponent } from './components/Shared/register/register.component';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ShoppingProductListComponent } from './components/Admin/home/ShoppingProduct/shopping-product-list/shopping-product-list.component';
import { NavbarnormalComponent } from './components/shared/nav-bar-normal/navbarnormal.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    NavBarAdminComponent,
    HomeAdminComponent,
    HomeNormalComponent,
    FooterComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    FormCustomerComponent,
    FormProductComponent,
    FormPaymentComponent,
    FormUpdateCustomerComponent,
    FormUpdateProductComponent,
    FormUpdatePaymentMethodComponent,
    PhonePipe,
    LoginComponent,
    RegisterComponent,
    ShoppingProductListComponent,
    NavbarnormalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgFallimgModule.forRoot({
      default:'https://www.actualidadecommerce.com/wp-content/uploads/2019/09/not-found-2384304_1280-830x467.jpg'

    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
