import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-update-product',
  templateUrl: './form-update-product.component.html',
  styleUrls: ['./form-update-product.component.css']
})
export class FormUpdateProductComponent implements OnInit {
title:string='Update Product';
product =new productModel();
  constructor(private productService: ProductService,private routActive:ActivatedRoute,private rout:Router) { }

  ngOnInit(): void {
    this.loadCustomer();

  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
      let proId =resp['proId'];
      console.log(proId);
      if(proId){
        this.productService.findById(proId).subscribe((data)=>{
          this.product=data;
        })
      }
    })
  }
  update(){
    this.productService.update(this.product).subscribe((rsp)=>{
      this.rout.navigate(['/products'])
      Swal.fire(
        'Product Update',
        `Product ${this.product.proId} update successfull`,
        'success'
      )
    })
      }
}
