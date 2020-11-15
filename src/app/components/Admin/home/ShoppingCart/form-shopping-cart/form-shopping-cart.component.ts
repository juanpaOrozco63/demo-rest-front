import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shoppingCartModel } from '../../../../../models/shoppingCart.model';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-shopping-cart',
  templateUrl: './form-shopping-cart.component.html',
  styleUrls: ['./form-shopping-cart.component.css']
})
export class FormShoppingCartComponent implements OnInit {
  title: string = 'New Shopping Cart';
  shoppingCart = new shoppingCartModel();

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
}
