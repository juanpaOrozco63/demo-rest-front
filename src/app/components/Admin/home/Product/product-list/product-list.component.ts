import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../domain/product';
import Swal from 'sweetalert2';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public title:string='List of Products';
  public products:Product[];
  id:string;
  pageActual:number=1;
  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.productService.findAll().subscribe(data=>{
      this.products=data;
      this.id='';
    },error=>{
      console.error(error);
    })
  } 
  findById(id:string):void{
    this.productService.findById(id).subscribe(data=>{
      this.products=[];
      this.products.push(data);

    },error=>{
      console.error(error);
    })
  }
  delete(proId:string):void{
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
        this.productService.delete(proId).subscribe(data=>{
          this.products =this.products;
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
          `Your product ${proId} has been deleted.`,
          'success'
        )
      }
    })
    
  }

}
