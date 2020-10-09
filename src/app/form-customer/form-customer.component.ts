import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customerModel } from '../models/customer.model';
import Swal from 'sweetalert2';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css'],
})
export class FormCustomerComponent implements OnInit {
  title: string = 'New Customer';
  customer = new customerModel();
  constructor(private customerService: CustomerService,private routActive:ActivatedRoute,private rout:Router) {}

  ngOnInit(): void {
  }
  
  save(): void {
    this.customerService.save(this.customer).subscribe((rsp) => {
      Swal.fire(
        'New Customer',
        `Customer ${this.customer.email} was create successfull`,
        'success'
      );
      this.rout.navigate(['/customers'])
    });
  }
  
}
