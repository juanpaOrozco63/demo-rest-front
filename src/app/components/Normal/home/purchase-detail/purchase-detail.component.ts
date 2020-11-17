import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/app/domain/ShoppingCart';
import { ShoppingProduct } from '../../../../domain/shoppingProduct';
import { ShoppingProductService } from '../../../../services/shopping-product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {
  public carts:ShoppingCart[];
  public products:ShoppingProduct[];
  constructor(public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute) { }
  carId:number;
  ngOnInit(): void {
    this.getCarId();
  }
  getCarId():void{
    this.routActive.params.subscribe(resp=>{
      let email =resp['email'];
      if(email){
        this.shoppingCartService.findCarIdShoppingCartsByEmail(email).subscribe(resp=>{
          this.carts=resp;
          this.carts.forEach(resp => {
            this.carId=resp.carId;
          });
          this.getProducts();
        })

      }
    })
  }
  getProducts():void{
    this.shoppingProductService.findAll().subscribe(resp=>{
      this.products=resp;
      this.products.forEach(resp => {        
      });
    })
  }
  delete(proId:number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete it! ${proId}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingCartService.removeProduct(this.carId,proId).subscribe(data=>{
          this.getProducts();
        },error=>{
          Swal.fire(
            'Error!',
            `${error.error.error}`,
            'error'
          )
        })
        Swal.fire(
          'Deleted!',
         ` Your shoppinProduct with shprId ${proId} has been deleted.`,
          'success'
        )
      }
    })
    
  }
}
