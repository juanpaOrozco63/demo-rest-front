import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeNormalComponent implements OnInit {

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

  createCart():void{

  }
  addProduct():void{
   
  }
  verifyCart():void{
    
  }
}
