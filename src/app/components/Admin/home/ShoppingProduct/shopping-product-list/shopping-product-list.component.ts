import { Component, OnInit } from '@angular/core';
import { ShoppingProduct } from '../../../../../domain/shoppingProduct';
import { ShoppingProductService } from '../../../../../services/shopping-product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-shopping-product-list',
  templateUrl: './shopping-product-list.component.html',
  styleUrls: ['./shopping-product-list.component.css']
})
export class ShoppingProductListComponent implements OnInit {
  public title:string='List of Shopping Product';
  public shoppingProducts:ShoppingProduct[];
  shprId:string;
  pageActual:number=1;

  constructor(public shoppingProductService:ShoppingProductService) { }

  ngOnInit(): void {
    this.findAll();
  }
  findAll():void{
    this.shoppingProductService.findAll().subscribe(data=>{
      this.shoppingProducts=data;
      this.shprId='';
    },error=>{
      console.error(error);
    })
  }
  findById(shprId:string):void{
    this.shoppingProductService.findById(shprId).subscribe(data=>{
      this.shoppingProducts=[];
      this.shoppingProducts.push(data);
    },error=>{
      console.error(error);
    })
  }
 
  delete(shprId:string):void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete it! ${shprId}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingProductService.delete(shprId).subscribe(data=>{
          this.shoppingProducts =this.shoppingProducts;
          this.findAll();
          this.shprId='';
        },error=>{
          Swal.fire(
            'Error!',
            `${error.error.error}`,
            'error'
          )
        })
        Swal.fire(
          'Deleted!',
         ` Your shoppinProduct with shprId ${shprId} has been deleted.`,
          'success'
        )
      }
    })
    
  }
}
