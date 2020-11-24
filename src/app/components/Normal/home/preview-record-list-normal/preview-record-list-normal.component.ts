import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { ShoppingProductService } from '../../../../services/shopping-product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../../../../domain/ShoppingCart';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-preview-record-list-normal',
  templateUrl: './preview-record-list-normal.component.html',
  styleUrls: ['./preview-record-list-normal.component.css']
})
export class PreviewRecordListNormalComponent implements OnInit {
  public clientFirebase: Subscription = new Subscription();
  title:string='Shopping Record';
  pageActual:number=1;
  carId:number=null;
  email:string=null;
  public shpcars:ShoppingCart[];
  public shpcars2:ShoppingCart[]=[];
  constructor(public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.clientFirebase = this.auth.user.subscribe((userFirebase) => {
      this.email = userFirebase.email;
    });
    this.findAll();

  }
  ngOnDestroy(): void {
    this.clientFirebase.unsubscribe();
  }
  // loadCustomer():void{
  //   this.routActive.params.subscribe(resp=>{
  //      this.email =resp['email'];
     
  //   })
  // }
  findAll():void{
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
