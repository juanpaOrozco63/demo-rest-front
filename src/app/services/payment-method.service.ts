import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PaymentMethod } from '../domain/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private url:string='http://localhost:9090/api/paymentMethod/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(public httClient:HttpClient,private router:Router) { }
  public findAll():Observable<any>{
    return this.httClient.get<any>(this.url+'findAll').pipe(
      catchError(e=>{
        Swal.fire('Error',`The database has no records`,'error');
         return throwError(e);
       })
    );
  }
  public findById(payId:number):Observable<any>{
    return this.httClient.get<any>(this.url+'findById/'+payId).pipe(
      catchError(e=>{
       Swal.fire('Error',`Payment Method with payId ${payId} don't exist`,'error');
       this.router.navigate(['/paymentMethod']);
        return throwError(e);
      })
    );
  }
  public delete(payId:number):Observable<any>{
    return this.httClient.delete<any>(this.url+'delete/'+payId).pipe(
      catchError(e=>{
       Swal.fire('Error',`Payment Method with payId ${payId} don't exist`,'error');
        return throwError(e);
      })
    );

  }
  public save(payment:PaymentMethod):Observable<any>{
    return this.httClient.post<any>(this.url+'save',payment,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e.error.error}`,'error');
         return throwError(e);
      })
    );

  }
  public update(payment:PaymentMethod):Observable<any>{
    return this.httClient.put<any>(this.url+'update',payment,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Payment Method with payId ${payment.name} don't exist`,'error');
         return throwError(e);
       })
    );

  }
}
