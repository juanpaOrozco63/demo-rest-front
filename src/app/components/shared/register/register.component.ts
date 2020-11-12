import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { userModel } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { customerModel } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../domain/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new userModel();
  constructor(public auth: AngularFireAuth, public router:Router,public customerService:CustomerService,public authS:AuthService) { }
  customer = new customerModel();
  userr:User;

  ngOnInit(): void {
    this.userr= new User("admin","password");
    this.saveToken();
  }
  async sendVericicationEmail():Promise<void>{
    return await (await this.auth.currentUser).sendEmailVerification();
  }
  completeUser():void{
  this.auth.user.subscribe(resp=>{
    this.customer.email=resp.email;
    this.customer.token=resp.uid;
  })
  }
  register(){
    if(this.user.password===this.user.confirmPassword){
      this.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).then(resp=>{
        this.sendVericicationEmail();
        this.completeUser();
        setTimeout(() => {
          this.save();
        }, 100);
      })
      
      }else{
        Swal.fire(
          `Passwords do not match`,
          ``,
          'error'
        );
      }
  }
  save(): void {
        this.customerService.save(this.customer).subscribe((rsp) => {
          Swal.fire(
            `New User`,
            ``,
            'success'
          );    
    });
  } 
  saveToken():void{
    this.authS.loginUser(this.userr).subscribe(data=>{
      localStorage.setItem("token",data.token);
    })
  }

}
