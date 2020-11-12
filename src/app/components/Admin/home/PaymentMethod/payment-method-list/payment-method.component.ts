import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../../../../../domain/payment-method';
import Swal from 'sweetalert2';
import { PaymentMethodService } from '../../../../../services/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodListComponent implements OnInit {
  public title:string='List of Payment Methods';
  public payments:PaymentMethod[];
  id:number;
  pageActual:number=1;
  constructor(public paymentMethodService:PaymentMethodService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.paymentMethodService.findAll().subscribe(data=>{
      this.payments=data;
      this.id=null;

    },error=>{
      console.error(error);
    })
  }
  findById(id:number):void{
    this.paymentMethodService.findById(id).subscribe(data=>{
      this.payments=[];
      this.payments.push(data);
    },error=>{
      console.error(error);
    })
  }
  delete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete it! ${id}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentMethodService.delete(id).subscribe(data=>{
          this.payments =this.payments;
          this.findAll();
          this.id=null;
        },error=>{
          Swal.fire(
            'Error!',
            `${error.error.error}`,
            'error'
          )
          console.error(error);
        })
        Swal.fire(
          'Deleted!',
         ` Your paymentMethod with payId ${id} has been deleted.`,
          'success'
        )
      }
    })
    
  }
}
