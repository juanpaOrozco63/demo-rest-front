import { Component, OnInit } from '@angular/core';
import { ShoppingProduct } from '../../../../../domain/shoppingProduct';
import { ShoppingProductService } from '../../../../../services/shopping-product.service';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  public products:ShoppingProduct[]=null;
  public products2:ShoppingProduct[]=[];
  pageActual:number=1;
  email:string=null;
  carId:number=null;
  total:number=null;
  constructor(public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute) { }
  title:string='Invoice';
  ngOnInit(): void {
    this.getProducts();
  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
       this.email =resp['email'];
       this.carId=resp['carId'];
       this.total=resp['total'];
     
    })
  }
  getProducts():void{
    this.loadCustomer();
    this.shoppingCartService.selectPurchase(this.email).subscribe(resp=>{
      this.products=resp;
      this.products.forEach(x => {
        if(x.shoppingCartId==this.carId){
          this.products2.push(x);
        }
      });
    })
  }
}
