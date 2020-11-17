import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../domain/product';
import { ProductService } from '../../../../../services/product.service';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShoppingCart } from '../../../../../domain/ShoppingCart';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public products:Product[];
  public clientFirebase: Subscription =new Subscription;
  email:string;
  totalItems:number=0;
  quantity:number=1;
  carId:number;
  public carts:ShoppingCart[];
  constructor(public productService:ProductService,public shoppingCartService:ShoppingCartService,public auth: AngularFireAuth) { }
  ngOnDestroy(): void {
    this.clientFirebase.unsubscribe();
  }
  ngOnInit(): void {
    this.findAll();
    this.clientFirebase=this.auth.user.subscribe((userFirebase)=>{
      this.email = userFirebase.email;
      this.checkCarts();
   })
  
  }
  findAll():void{
    this.productService.findAll().subscribe(data=>{
      this.products=data;
    },error=>{
      console.error(error);
    })
  } 
  addProduct(proId:string,product:string):void{
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp=>{
    this.carts=resp;
      this.carts.forEach(car => {
        if(car.enable==='Y'){
           this.carId =car.carId; 
          this.shoppingCartService.addProduct(this.carId,proId,this.quantity).subscribe((resp)=>{
            
          })
        }
      });
      this.totalItems=this.totalItems+this.quantity;
      Swal.fire(
        `Added to the list`,
       ` You add ${this.quantity} ${product} to your shopping cart!`,
        'success'
      )
      this.quantity=1;
})

  }
  itemsShoppingCart():void{
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp=>{
      this.carts=resp;
        this.carts.forEach(car => {
          if(car.enable==='Y'){
          this.totalItems=car.items;
          }
        });
  })
  }
  checkCarts():void{
    let validate=false;
    setTimeout(() => {
      this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(x=>{
        this.carts=x;
        if(this.carts===null){
          this.shoppingCartService.createCart(this.email).subscribe(resp=>{
            setTimeout(() => {
              this.itemsShoppingCart();
            }, 300);
          })
        }else{
          setTimeout(() => {
            this.carts.forEach(car=>{
              if(car.enable==='Y'){
                setTimeout(() => {
                  this.itemsShoppingCart();
                  validate=true;
                }, 300);
              }
              
            }
            )
            setTimeout(() => {
              if(validate===false){
                this.shoppingCartService.createCart(this.email).subscribe(resp=>{
                  setTimeout(() => {
                    this.itemsShoppingCart();
                  }, 300);
                }) 
              
            }
            }, 300);
            
          }, 500);
        }
 
        
      })
      
    }, 1000); 

  }
  clearCart():void{
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp=>{
      this.carts=resp;
        this.carts.forEach(car => {
          if(car.enable==='Y'){
            this.carId =car.carId;
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `Yes, delete all!`
            }).then((result) => {
              if (result.isConfirmed) {
                this.shoppingCartService.clearCart(this.carId).subscribe(data=>{
                  this.totalItems=0;
                },error=>{
                  Swal.fire(
                    'Error!',
                    `${error.error.error}`,
                    'error'
                  )
                })
                Swal.fire(
                  'Deleted!',
                 ` Your Shopping Cart was empited.`,
                  'success'
                )
              }
            }) 
            
          }
        
        
   
  })
})
  }


}
