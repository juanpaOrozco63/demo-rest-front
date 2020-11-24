import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../../../../domain/ShoppingCart';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import Swal from 'sweetalert2';
import { CloseShoppingCart } from '../../../../../domain/close-shopping-cart';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {
  public title:string='List of Shopping Cart';
  public shpcars:ShoppingCart[];
  id:string;
  public cartClose:CloseShoppingCart= new CloseShoppingCart(null,null);
  pageActual:number=1;
  constructor(public shoppingCartService:ShoppingCartService) { }
  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.shoppingCartService.findAll().subscribe(data=>{
      this.shpcars=data;
      this.id='';
    },error=>{
      console.error(error);
    })
  } 
  findById(id:string):void{
    this.shoppingCartService.findById(id).subscribe(data=>{
      this.shpcars=[];
      this.shpcars.push(data);

    },error=>{
      console.error(error);
    })
  }
  delete(carId:number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete it! ${carId}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingCartService.delete(carId).subscribe(data=>{
          this.shpcars =this.shpcars;
          this.findAll();
          this.id='';
        },error=>{
          Swal.fire(
            'Error!',
            `${error.error.error}`,
            'error'
          )
        })
        Swal.fire(
          'Deleted!',
          `Your product ${carId} has been deleted.`,
          'success'
        )
      }
    })
    
  }
  clearCart(carId:number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, clear cart! ${carId}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingCartService.clearCart(carId).subscribe((rsp)=>{
         
          this.findAll();
        },error=>{
          Swal.fire(
            'Error!',
            `${error.error.error}`,
            'error'
          )
        })
        Swal.fire(
          'Clean!',
          `Your Shopping Cart with carId: ${carId} was cleaned.`,
          'success'
        )
      }
    })
    
     
    
  }
  disabled(carId:number,payId:number=1):void{
    this.cartClose.carId=carId;
    this.cartClose.payId=payId;
    console.log(this.cartClose);
    this.shoppingCartService.closeShoppingCart(this.cartClose).subscribe((resp)=>{
      Swal.fire(
        'Shopping Cart Disabled!',
        `Your Shopping Cart with carId: ${this.cartClose.carId} now has payment method with payId: ${this.cartClose.payId}.`,
        'success'
      )
      this.findAll();
    }
    )

  }

}
