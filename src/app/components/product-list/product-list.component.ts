import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public title:string='List of Products';
  public products:Product[];
  id:string='';
  validar:boolean=false;
  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.productService.findAll().subscribe(data=>{
      this.products=data;
      this.validar=false;
      this.id='';
    },error=>{
      console.error(error);
    })
  } 
  findById(id:string):void{
    this.productService.findById(id).subscribe(data=>{
      this.products=[];
      this.products.push(data);
      this.validar=false;

    },error=>{
      this.validar=true;
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
            `Your product ${proId} cannot be deleted.`,
            'error'
          )
          console.error(error);
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
