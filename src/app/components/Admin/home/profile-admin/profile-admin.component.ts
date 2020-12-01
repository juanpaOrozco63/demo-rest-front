import { Component, OnInit } from '@angular/core';
import { customerModel } from '../../../../models/customer.model';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { CustomerService } from '../../../../services/customer.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  customer = new customerModel();
  constructor(public auth: AngularFireAuth,public customerService:CustomerService,private route:Router) { }
  public clientFirebase: Subscription =new Subscription;
  ngOnInit(): void {
    this.clientFirebase=this.auth.user.subscribe((userFirebase)=>{
      this.customer.email = userFirebase.email;
      this.findById(this.customer.email);
   })
  }
  ngOnDestroy(): void {
    this.clientFirebase.unsubscribe();
  } 
  update(){
    this.customerService.update(this.customer).subscribe((rsp)=>{
      this.route.navigate(['/profileAdmin'])
      Swal.fire(
        'Customer Update',
        `Customer ${this.customer.email} update successfull`,
        'success'
      )
    })
  }
  findById(email:string):void{
    this.customerService.findById(email).subscribe(data=>{
      this.customer=data;
    },error=>{
      console.error(error);
    })
  }
  
}
