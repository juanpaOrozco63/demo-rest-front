import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../domain/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public title:string='List of Customers';
  public customers:Customer[];
  email:string;
  pageActual:number=1;
  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
    this.findAll();
  } 
  findAll():void{
    this.customerService.findAll().subscribe(data=>{
      this.customers=data;
      this.email='';
    },error=>{
      console.error(error);
    })
  }
  findById(email:string):void{
    this.customerService.findById(email).subscribe(data=>{
      this.customers=[];
      this.customers.push(data);
    },error=>{
      console.error(error);
    })
  }
  delete(email:string):void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete it! ${email}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.delete(email).subscribe(data=>{
          this.customers =this.customers;
          this.findAll();
          this.email='';
        },error=>{
          Swal.fire(
            'Error!',
            `${error.error.error}`,
            'error'
          )
        })
        Swal.fire(
          'Deleted!',
         ` Your customer ${email} has been deleted.`,
          'success'
        )
      }
    })
    
  }

}
