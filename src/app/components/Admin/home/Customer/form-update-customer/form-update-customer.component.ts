import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { customerModel } from '../../../../../models/customer.model';
import { CustomerService } from '../../../../../services/customer.service';

@Component({
  selector: 'app-form-update-customer',
  templateUrl: './form-update-customer.component.html',
  styleUrls: ['./form-update-customer.component.css']
})
export class FormUpdateCustomerComponent implements OnInit {
  customer = new customerModel();
  title:string ='Update Customer';
  constructor(private customerService: CustomerService,private routActive:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.loadCustomer();

  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
      let email =resp['email'];
      if(email){
        this.customerService.findById(email).subscribe((data)=>{
          this.customer=data;
        })
      }
    })
  }
  update(){
    this.customerService.update(this.customer).subscribe((rsp)=>{
      this.route.navigate(['/customers'])
      Swal.fire(
        'Customer Update',
        `Customer ${this.customer.email} update successfull`,
        'success'
      )
    })
      }
      back():void{
        this.route.navigate(['/customers'])
      }
}
