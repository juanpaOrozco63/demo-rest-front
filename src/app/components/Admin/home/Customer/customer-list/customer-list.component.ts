import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../../../domain/customer';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/auth';
import { CustomerService } from '../../../../../services/customer.service';

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
  userActive:string;
  constructor(public customerService:CustomerService,public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.findAll();
    this.auth.user.subscribe(resp=>{
      this.userActive=resp.email;
    })
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
      console.log(this.customers[0].typeUser);
    },error=>{
      console.error(error);
    })
  }
  async deleteFirebase():Promise<void>{
    console.log("Eliminado en firebase");
    return await (await this.auth.currentUser).delete();
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
          this.deleteFirebase();
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