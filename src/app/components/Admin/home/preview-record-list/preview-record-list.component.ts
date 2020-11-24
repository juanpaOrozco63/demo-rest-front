import { Component, OnInit } from '@angular/core';
import { ShoppingProductService } from '../../../../services/shopping-product.service';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingProduct } from '../../../../domain/shoppingProduct';
import { ShoppingCart } from '../../../../domain/ShoppingCart';

@Component({
  selector: 'app-preview-record-list',
  templateUrl: './preview-record-list.component.html',
  styleUrls: ['./preview-record-list.component.css']
})
export class PreviewRecordListComponent implements OnInit {
  pageActual:number=1;
  title:string='Shopping Record';
  carId:number=null;
  email:string=null;
  public shpcars:ShoppingCart[];
  public shpcars2:ShoppingCart[]=[];
  constructor(public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute) { }

  ngOnInit(): void {
    this.findAll();
  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
       this.email =resp['email'];
     
    })
  }
  findAll():void{
    this.loadCustomer();
    this.shoppingCartService.findAll().subscribe(data=>{
      this.shpcars=data;
      this.shpcars.forEach(resp => {
        if(resp.customerEmail==this.email && resp.paymentMethodId!=null){
          this.shpcars2.push(resp);
        }
      });
    },error=>{
      console.error(error);
    })  
  } 
}
