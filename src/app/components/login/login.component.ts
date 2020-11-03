import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new userModel;
  public userr:User;

  constructor(private router:Router,public auth: AngularFireAuth, public authService:AuthService) { }

  ngOnInit(): void {
    this.userr= new User("","");

  }
  public signIn():void{
    this.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then(resp=>{
      this.userr= new User("admin","password");
      this.authService.loginUser(this.userr).subscribe(data=>{
        localStorage.setItem("usuario",JSON.stringify(this.user));
        localStorage.setItem("token",data.token);
        this.router.navigate(['/home']);

    },err=>{
      console.log(err);
    })
    })
    // console.log(this.userr);
    

    // }
    // )
  }
}
