import { Component, OnInit } from '@angular/core';
import { User } from '../../../domain/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { userModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new userModel;
  public userr:User;
  constructor(private router:Router,public auth: AngularFireAuth, public authService:AuthService,public customerService:CustomerService) { }

  ngOnInit(): void {
    this.userr= new User("admin","password");
    this.saveToken();
  }
  findById(email:string):void{
    this.customerService.findById(email).subscribe(data=>{
      localStorage.setItem("type",data.typeUser);
    },error=>{
      console.error(error);
    })
  }
  public signIn():void{
    this.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then(resp=>{
      this.findById(this.user.email);
      this.auth.user.subscribe(x=>{
        this.userr= new User("","");
        if(x.emailVerified===false){
          Swal.fire(
            `Tienes que verificar tu email`,
            ``,
            'error'
          );
        }else{
          this.userr= new User("admin","password");
          this.authService.loginUser(this.userr).subscribe(data=>{
            if(localStorage.getItem("type")==='0'){
              // Usuarios Normales
              localStorage.setItem("user",JSON.stringify(this.user));
              localStorage.setItem("token",data.token);
              Swal.fire(
                `Welcome`,
                `Normal ${this.user.email}`,
                'success'
              );
              this.router.navigate(['/homeNormal']);
            }else if(localStorage.getItem("type")==='1'){
              // Usuarios Admins
              localStorage.setItem("user",JSON.stringify(this.user));
              localStorage.setItem("token",data.token);
              Swal.fire(
                `Welcome`,
                `Admin ${this.user.email}`,
                'success'
              );
              this.router.navigate(['/homeAdmin']);

            }
            
         
    
        },err=>{
          Swal.fire(
            `${err}`,
            ``,
            'error'
          );
        })
        }

        
      })
     
    }).catch(resp=>{
      Swal.fire(
        `${resp}`,
        ``,
        'error'
      );
    })
  

  }
  saveToken():void{
    this.authService.loginUser(this.userr).subscribe(data=>{
      localStorage.setItem("token",data.token);
    })
  }
  
}
