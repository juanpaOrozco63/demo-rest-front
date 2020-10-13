import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { customerModel } from '../../models/customer.model';
import { Enable } from '../../domain/enable';
import { EnableService } from '../../services/enable.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css'],
})
export class FormCustomerComponent implements OnInit {
  title: string = 'New Customer';
  customer = new customerModel();
  public enables:Enable[];
  public showMsg:boolean=false;
  public messages:string[]=[""];
  constructor(private customerService: CustomerService,private rout:Router,private enableService:EnableService) {}

  ngOnInit(): void {
    this.findAllEnable();
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
  findAllEnable():void{
    this.enables=this.enableService.findAll();
  }
}
