import { Component, OnInit } from '@angular/core';
import { shoppingProductModel } from '../../../../../models/shoppingProduct.model';
import { ShoppingProductService } from '../../../../../services/shopping-product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-shopping-product',
  templateUrl: './form-shopping-product.component.html',
  styleUrls: ['./form-shopping-product.component.css']
})
export class FormShoppingProductComponent implements OnInit {
  title:string='New Shopping Product';
  shprs = new shoppingProductModel();
  constructor(private ShoppingProductService:ShoppingProductService,private route:Router) { }

  ngOnInit(): void {
  }
  save(): void {
    this.ShoppingProductService.save(this.shprs).subscribe((rsp) => {
      Swal.fire(
        'New Shopping Product',
        `shprId Method with shprId ${this.shprs.shprId} was create successfull`,
        'success'
      );
      console.log(this.shprs);
      this.route.navigate(['/shoppingProduct'])
    }); 
  }
}
