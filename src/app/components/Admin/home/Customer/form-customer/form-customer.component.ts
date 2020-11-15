import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { customerModel } from '../../../../../models/customer.model';
import { CustomerService } from '../../../../../services/customer.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css'],
})
export class FormCustomerComponent implements OnInit {
  title: string = 'New Customer';
  customer = new customerModel();
  constructor(private customerService: CustomerService,private route:Router) {}

  ngOnInit(): void {
  }
  
  save(): void {
    this.customerService.save(this.customer).subscribe((rsp) => {
      Swal.fire(
        'New Customer',
        `Customer ${this.customer.email} was create successfull`,
        'success'
      );
      this.route.navigate(['/customers'])
    });
  }
  
}
