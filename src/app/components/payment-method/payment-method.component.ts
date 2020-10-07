import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../../domain/payment-method';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  public title:string='List of Payment Methods';
  public payments:PaymentMethod[];
  id:number;
  validar:boolean=false;
  constructor(public paymentMethodService:PaymentMethodService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.paymentMethodService.findAll().subscribe(data=>{
      this.payments=data;
      this.validar=false;

    },error=>{
      console.error(error);
    })
  }
  findById():void{
    this.paymentMethodService.findById(this.id).subscribe(data=>{
      this.payments=[];
      this.payments.push(data);
      this.validar=false;
    },error=>{
      this.validar=true;
      this.payments=[];
      console.error(error);
    })
  }
}
