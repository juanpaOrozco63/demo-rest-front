import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../domain/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public title:string='List of Customers';
  public customers:Customer[];
  email:string='';
  validar:boolean=false;
  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
      this.findAll();
  }
  findAll():void{
    this.customerService.findAll().subscribe(data=>{
      this.customers=data;
      this.validar=false;
    },error=>{
      console.error(error);
    })
  }
  findById():void{
    this.customerService.findById(this.email).subscribe(data=>{
      this.customers=[];
      this.customers.push(data);
      this.email='';
      this.validar=false;
    },error=>{
      this.validar=true;
      this.customers=[];
      this.email='';
      console.error(error);
    })
  }

  
}
