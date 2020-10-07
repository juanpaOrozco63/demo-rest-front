import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../../domain/payment-method';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  public title:string='Lista de metodos de pago';
  public payments:PaymentMethod;
  constructor(public paymentMethodService:PaymentMethodService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.paymentMethodService.findAll().subscribe(data=>{
      this.payments=data;
      console.log(data)
    },error=>{
      console.error(error);
    })
  }
}
