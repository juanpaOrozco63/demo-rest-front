import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { ShoppingCart } from '../../../domain/ShoppingCart';

@Component({
  selector: 'app-nav-bar-normal',
  templateUrl: './nav-bar-normal.component.html',
  styleUrls: ['./nav-bar-normal.component.css']
})
export class NavbarnormalComponent implements OnInit {
  email:string;
  public carts:ShoppingCart[];

  constructor(public auth: AngularFireAuth, private route:Router,public shoppingCartService:ShoppingCartService) { }
  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
  }
  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.route.navigate(['/login'])
    
  }
  
}
