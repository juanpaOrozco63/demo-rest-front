import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { productModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  title:string='New Product';
  product =new productModel();
  constructor(private ProductService:ProductService,
    private routActive:ActivatedRoute,private rout:Router) { }

  ngOnInit(): void {
  }
  save(): void {
    this.ProductService.save(this.product).subscribe((rsp) => {
      Swal.fire(
        'New Product',
        `Product ${this.product.proId} was create successfull`,
        'success'
      );
      this.rout.navigate(['/products'])
    });
  }
}
