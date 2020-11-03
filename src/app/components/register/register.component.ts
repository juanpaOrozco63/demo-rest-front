import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { userModel } from '../../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new userModel();
  constructor(public auth: AngularFireAuth, public router:Router) { }

  ngOnInit(): void {
  }
  registrar(){
      this.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).then(resp=>{
        console.log('Se registro bien');
        })
      
     
  }
   
      
     



}
