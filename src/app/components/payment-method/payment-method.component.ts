import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../../domain/payment-method';
import { PaymentMethodService } from '../../services/payment-method.service';
import Swal from 'sweetalert2';

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
  pageActual:number=1;
  constructor(public paymentMethodService:PaymentMethodService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.paymentMethodService.findAll().subscribe(data=>{
      this.payments=data;
      this.validar=false;
      this.id=null;

    },error=>{
      console.error(error);
    })
  }
  findById(id:number):void{
    this.paymentMethodService.findById(id).subscribe(data=>{
      this.payments=[];
      this.payments.push(data);
      this.validar=false;
    },error=>{
      this.validar=true;
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
            `Your paymentMethod with payId ${id} cannot be deleted.`,
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
