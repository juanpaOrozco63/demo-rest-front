// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Rutas
import { AppRoutingModule } from './app-routing.module';
// Componentes
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
// Http
import {HttpClientModule} from '@angular/common/http';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { FormProductComponent } from './form-product/form-product.component';
import { FormPaymentComponent } from './form-payment/form-payment.component';


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
    FormPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
