import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PaymentMethod } from '../domain/payment-method';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private url:string=environment.apiUrl+'api/paymentMethod/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(public httClient:HttpClient,private router:Router) { }
  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers= new HttpHeaders({'Authorization':token});
    return headers;
  }
  public findAll():Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'findAll',{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`The database has no records`,'error');
         return throwError(e);
       })
    );
  }
  public findById(payId:number):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'findById/'+payId,{headers:headers}).pipe(
      catchError(e=>{
       Swal.fire('Error',`Payment Method with payId ${payId} don't exist`,'error');
       this.router.navigate(['/paymentMethod']);
        return throwError(e);
      })
    );
  }
  public delete(payId:number):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.delete<any>(this.url+'delete/'+payId,{headers:headers}).pipe(
      catchError(e=>{
       Swal.fire('Error',`Payment Method with payId ${payId} don't exist`,'error');
        return throwError(e);
      })
    );

  }
  public save(payment:PaymentMethod):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.post<any>(this.url+'save',payment,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e.error.error}`,'error');
         return throwError(e);
      })
    );

  }
  public update(payment:PaymentMethod):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.put<any>(this.url+'update',payment,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Payment Method with payId ${payment.name} don't exist`,'error');
         return throwError(e);
       })
    );

  }
}
