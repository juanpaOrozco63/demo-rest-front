import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ShoppingCart } from '../domain/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private  url:string=environment.apiUrl+'api/shoppingCart/';

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
  public findById(carId:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'findById/'+carId,{headers:headers}).pipe(
      catchError(e=>{
       Swal.fire('Error',`Shopping-Cart with ${carId} don't exist`,'error');
       this.router.navigate(['/shoppingProduct']);
        return throwError(e);
      })
    );
  }
  public delete(carId:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.delete<any>(this.url+'delete/'+carId,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Shopping-Cart with  ${carId} don't exist`,'error');
         return throwError(e);
       })
    );

  }
  public save(carId:ShoppingCart):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.post<any>(this.url+'save',carId,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e}`,'error');
         return throwError(e);
      })
    );

  }
  public update(carId:ShoppingCart):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.put<any>(this.url+'update',carId,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Shopping Cart with ${carId.carId} don't exist`,'error');
         return throwError(e);
       })
    );

  }
}
