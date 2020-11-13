import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Customer } from '../domain/customer';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private  url:string=environment.apiUrl+'api/customer/';
  constructor(public httClient:HttpClient, private router:Router) { }

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
  public findById(email:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'findById/'+email,{headers:headers}).pipe(
      catchError(e=>{
       Swal.fire('Error',`Customer ${email} don't exist`,'error');
       this.router.navigate(['/customers']);
        return throwError(e);
      })
    );
  }
  public delete(email:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.delete<any>(this.url+'delete/'+email,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Customer  ${email} don't exist`,'error');
         return throwError(e);
       })
    );

  }
  public save(customer:Customer):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.post<any>(this.url+'save',customer,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e}`,'error');
         return throwError(e);
      })
    );

  }
  public update(customer:Customer):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.put<any>(this.url+'update',customer,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Customer with ${customer.email} don't exist`,'error');
         return throwError(e);
       })
    );

  }
}
