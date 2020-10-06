import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../domain/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public title:string='Lista de clientes';
  public customers:Customer[];
  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
    this.findAll();
  }
  findAll():void{
    this.customerService.findAll().subscribe(data=>{
      this.customers=data;
    },error=>{
      console.error(error);
    })
  }

}
