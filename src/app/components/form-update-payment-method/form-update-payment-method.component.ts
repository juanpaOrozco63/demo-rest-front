import { Component, OnInit } from '@angular/core';
import { paymentMethodModel } from '../../models/payment.model';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-update-payment-method',
  templateUrl: './form-update-payment-method.component.html',
  styleUrls: ['./form-update-payment-method.component.css']
})
export class FormUpdatePaymentMethodComponent implements OnInit {
  title:string='Update Payment Method';
  payment = new paymentMethodModel();
  constructor(private paymentMethosService: PaymentMethodService,private routActive:ActivatedRoute,private rout:Router) { }

  ngOnInit(): void {
    this.loadCustomer();

  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
      let payId =resp['payId'];
      console.log(payId);
      if(payId){
        this.paymentMethosService.findById(payId).subscribe((data)=>{
          this.payment=data;
        })
      }
    })
  }
  update(){
    this.paymentMethosService.update(this.payment).subscribe((rsp)=>{
      this.rout.navigate(['/paymentMethod'])
      Swal.fire(
        'Payment method Update',
        `Payment method ${this.payment.name} update successfull`,
        'success'
      )
    })
      }
}
