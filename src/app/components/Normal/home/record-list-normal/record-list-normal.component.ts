import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { ShoppingCart } from '../../../../domain/ShoppingCart';
import { ShoppingProduct } from '../../../../domain/shoppingProduct';
import { ShoppingProductService } from '../../../../services/shopping-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-list-normal',
  templateUrl: './record-list-normal.component.html',
  styleUrls: ['./record-list-normal.component.css'],
})
export class RecordListNormalComponent implements OnInit {
  public products:ShoppingProduct[]=null;
  public products2:ShoppingProduct[]=[];
  pageActual:number=1;
  email:string=null;
  carId:number=null;
  title:string='Invoice';
  constructor(
    public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
       this.email =resp['email'];
       this.carId=resp['carId']
     
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
