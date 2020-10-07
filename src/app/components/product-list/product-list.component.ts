import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';

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
    },error=>{
      console.error(error);
    })
  } 
  findById():void{
    this.productService.findById(this.id).subscribe(data=>{
      this.products=[];
      this.products.push(data);
      this.id='';
      this.validar=false;

    },error=>{
      this.validar=true;
      this.products=[];
      this.id='';
      console.error(error);
    })
  }
}
