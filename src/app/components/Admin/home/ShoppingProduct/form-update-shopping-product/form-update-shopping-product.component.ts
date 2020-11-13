import { Component, OnInit } from '@angular/core';
import { shoppingProductModel } from '../../../../../models/shoppingProduct.model';
import { ShoppingProductService } from '../../../../../services/shopping-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-update-shopping-product',
  templateUrl: './form-update-shopping-product.component.html',
  styleUrls: ['./form-update-shopping-product.component.css']
})
export class FormUpdateShoppingProductComponent implements OnInit {
  title:string='Update Shopping Product';
  shprs = new shoppingProductModel();
  constructor(private shoppingProductService:ShoppingProductService,private routActive:ActivatedRoute,private rout:Router) { }

  ngOnInit(): void {
    this.loadCustomer();

  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
      let payId =resp['shprId'];
      if(payId){
        this.shoppingProductService.findById(payId).subscribe((data)=>{
          this.shprs=data;
        })
      }
    })
  }
  update(){
    this.shoppingProductService.update(this.shprs).subscribe((rsp)=>{
      this.rout.navigate(['/shoppingProduct'])
      Swal.fire(
        'ShoppingProduct Update',
        `ShoppingProduct with shprId ${this.shprs.shprId} update successfull`,
        'success'
      )
    })
      }

}
