import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../domain/product';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public products:Product[];

  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.productService.findAll().subscribe(data=>{
      this.products=data;
    },error=>{
      console.error(error);
    })
  } 
}
