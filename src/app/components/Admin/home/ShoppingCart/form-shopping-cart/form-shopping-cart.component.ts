import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shoppingCartModel } from '../../../../../models/shoppingCart.model';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import Swal from 'sweetalert2';
import { Email } from '../../../../../domain/email';
@Component({
  selector: 'app-form-shopping-cart',
  templateUrl: './form-shopping-cart.component.html',
  styleUrls: ['./form-shopping-cart.component.css']
})
export class FormShoppingCartComponent implements OnInit {
  title: string = 'New Shopping Cart';
  shoppingCart = new shoppingCartModel();
  public createCartEmail:Email=new Email(null);

  constructor(private route:Router,private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  } 
  save(): void {
    this.shoppingCartService.save(this.shoppingCart).subscribe((rsp) => {
      Swal.fire(
        'New Shopping Cart',
        `Shopping Cart ${this.shoppingCart.carId} was create successfull`,
        'success'
      );
      this.route.navigate(['/shoppingCart'])
    });
  }
  createCart():void{
    this.createCartEmail.email=this.shoppingCart.customerEmail;
    this.shoppingCartService.createCart( this.createCartEmail).subscribe(resp=>{
      Swal.fire(
        'Confirmed!',
        `Your shoppingCart with ${this.createCartEmail.email} has been create successfull.`,
        'success'
      )
      this.route.navigate(['/shoppingCart'])
    })
  }
}
