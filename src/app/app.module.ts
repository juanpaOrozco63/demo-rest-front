// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
// Rutas
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

// Componentes
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { FormUpdateProductComponent } from './components/form-update-product/form-update-product.component';
// Http
import {HttpClientModule} from '@angular/common/http';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { FormUpdateCustomerComponent } from './components/form-update-customer/form-update-customer.component';
import { FormUpdatePaymentMethodComponent } from './components/form-update-payment-method/form-update-payment-method.component';
// Ngm install
import {NgxPaginationModule} from 'ngx-pagination';
import { NgFallimgModule } from 'ng-fallimg';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    ProductListComponent,
    PaymentMethodComponent,
    FormCustomerComponent,
    FormProductComponent,
    FormPaymentComponent,
    FormUpdateCustomerComponent,
    FormUpdateProductComponent,
    FormUpdatePaymentMethodComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    HttpClientModule,
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
