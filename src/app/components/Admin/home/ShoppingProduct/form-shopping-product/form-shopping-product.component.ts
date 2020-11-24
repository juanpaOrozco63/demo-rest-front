import { Component, OnInit } from '@angular/core';
import { shoppingProductModel } from '../../../../../models/shoppingProduct.model';
import { ShoppingProductService } from '../../../../../services/shopping-product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import { AddShoppingProduct } from '../../../../../domain/add-shopping-product';

@Component({
  selector: 'app-form-shopping-product',
  templateUrl: './form-shopping-product.component.html',
  styleUrls: ['./form-shopping-product.component.css']
})
export class FormShoppingProductComponent implements OnInit {
  title:string='New Shopping Product';
  shprs = new shoppingProductModel();
  public shoppingProduct:AddShoppingProduct= new AddShoppingProduct(null,null,null);
  constructor(private ShoppingProductService:ShoppingProductService,private route:Router,private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }
  save(): void {
    this.ShoppingProductService.save(this.shprs).subscribe((rsp) => {
      Swal.fire(
        'New Shopping Product',
        `shprId with shprId: ${this.shprs.shprId} was create successfull`,
        'success'
      );
      this.route.navigate(['/shoppingProduct'])
    }); 
  }
  addProduct():void{
    this.shoppingProduct.carId=this.shprs.shoppingCartId;
    this.shoppingProduct.proId=this.shprs.productId;
    this.shoppingProduct.quantity=this.shprs.quantity;

    this.shoppingCartService.addProduct(this.shoppingProduct).subscribe((rsp)=>{
      Swal.fire(
        'New Shopping Product',
        `The product ${this.shprs.productId} was add success in the shoppingCart with carId: ${this.shoppingProduct.carId}`,
        'success'
      );
      this.route.navigate(['/shoppingProduct'])

    })
  }
}
