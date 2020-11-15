import { Component, OnInit } from '@angular/core';
import { shoppingCartModel } from 'src/app/models/shoppingCart.model';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-update-shopping-cart',
  templateUrl: './form-update-shopping-cart.component.html',
  styleUrls: ['./form-update-shopping-cart.component.css']
})
export class FormUpdateShoppingCartComponent implements OnInit {
  title:string ='Update Shopping Cart';
  shoppingCart = new shoppingCartModel();

  constructor(private shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.loadshoppingCart();
  }
  loadshoppingCart():void{
    this.routActive.params.subscribe(resp=>{
      let carId =resp['carId'];
      if(carId){
        this.shoppingCartService.findById(carId).subscribe((data)=>{
          this.shoppingCart=data;
        })
      }
    })
  }
  update(){
    this.shoppingCartService.update(this.shoppingCart).subscribe((rsp)=>{
      this.route.navigate(['/shoppingCart'])
      Swal.fire(
        'ShoppingCart Update',
        `ShoppingCart with carId ${this.shoppingCart.carId} update successfull`,
        'success'
      )
    })
      }
      back():void{
        this.route.navigate(['/shoppingCart'])
      }
}
