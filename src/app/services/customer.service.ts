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
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  
  constructor(public httClient:HttpClient, private router:Router) { }

  public findAll():Observable<any>{
    return this.httClient.get<any>(this.url+'findAll').pipe(
      catchError(e=>{
        Swal.fire('Error',`The database has no records`,'error');
         return throwError(e);
       })
    );
  }
  public findById(email:string):Observable<any>{
    return this.httClient.get<any>(this.url+'findById/'+email).pipe(
      catchError(e=>{
       Swal.fire('Error',`Customer ${email} don't exist`,'error');
       this.router.navigate(['/customers']);
        return throwError(e);
      })
    );
  }
  public delete(email:string):Observable<any>{
    return this.httClient.delete<any>(this.url+'delete/'+email).pipe(
      catchError(e=>{
        Swal.fire('Error',`Customer  ${email} don't exist`,'error');
         return throwError(e);
       })
    );

  }
  public save(customer:Customer):Observable<any>{
    return this.httClient.post<any>(this.url+'save',customer,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e.error.error}`,'error');
         return throwError(e);
      })
    );

  }
  public update(customer:Customer):Observable<any>{
    return this.httClient.put<any>(this.url+'update',customer,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Customer with ${customer.email} don't exist`,'error');
         return throwError(e);
       })
    );

  }
}
