import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../domain/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { userModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../../../services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  public title:String='Login';
  public clientFirebase: Subscription =new Subscription;
  public clientFindById: Subscription =new Subscription;
  public clientToken: Subscription =new Subscription;
  public clientUser: Subscription =new Subscription;
  public user = new userModel;
  public userToken:User;
  constructor(private router:Router,public auth: AngularFireAuth,
  public authService:AuthService,public customerService:CustomerService) { }

  ngOnInit(): void {
    this.userToken= new User("admin","password");
    this.saveToken();
  }
  ngOnDestroy(): void {
    this.clientFirebase.unsubscribe();
    this.clientFindById.unsubscribe();
    this.clientToken.unsubscribe();
    this.clientUser.unsubscribe();
  }
  public signIn():void{
    this.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then(resp=>{
      this.findById(this.user.email);
      this.clientFirebase=this.auth.user.subscribe(userFirebase=>{
        this.userToken= new User("","");
        if(userFirebase.emailVerified===false){
          Swal.fire(
            `You need verify your email`,
            `Error`,
            'error'
          );
        }else if(userFirebase.emailVerified===true){
          this.userToken= new User("admin","password");
          this.authService.loginUser(this.userToken).subscribe(data=>{
            if(localStorage.getItem("type")==='0'){
              // User Normals
              localStorage.setItem("user",JSON.stringify(this.user.email));
              localStorage.setItem("token",data.token);
              Swal.fire(
                `Welcome`,
                `Normal ${this.user.email}`,
                'success'
              );
              this.router.navigate(['/homeNormal']);
            }else if(localStorage.getItem("type")==='1'){
              // User Admins
              localStorage.setItem("user",JSON.stringify(this.user.email));
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
            `Error`,
            'error'
          );
        })
        }

        
      },catchError=>{
        console.warn(catchError);
      })
     
    }).catch(resp=>{
      Swal.fire(
        `${resp}`,
        `Error`,
        'error'
      );
    })
  

  }
  saveToken():void{
    this.clientToken=this.authService.loginUser(this.userToken).subscribe(data=>{
      localStorage.setItem("token",data.token);
    })
  }
  findById(email:string):void{
    this.clientFindById=this.customerService.findById(email).subscribe(data=>{
      localStorage.setItem("type",data.typeUser);
    },error=>{
      console.error(error);
    })
  }
  
}
