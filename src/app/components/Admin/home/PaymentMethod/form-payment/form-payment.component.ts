import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { paymentMethodModel } from '../../../../../models/payment.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.css']
})
export class FormPaymentComponent implements OnInit {
  title:string='New Payment Method';
  payment = new paymentMethodModel();
  constructor(private paymentMethodService: PaymentMethodService,private rout:Router) { }

  ngOnInit(): void {
  }
  save(): void {
    this.paymentMethodService.save(this.payment).subscribe((rsp) => {
      Swal.fire(
        'New Payment Method',
        `Payment Method ${this.payment.name} was create successfull`,
        'success'
      );
      this.rout.navigate(['/paymentMethod'])
    });
  }
}
