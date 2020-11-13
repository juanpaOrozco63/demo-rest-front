import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ShoppingProduct } from '../domain/shoppingProduct';

@Injectable({
  providedIn: 'root'
})
export class ShoppingProductService {
  private  url:string=environment.apiUrl+'api/shoppingProduct/';

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
  public findById(shprId:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'findById/'+shprId,{headers:headers}).pipe(
      catchError(e=>{
       Swal.fire('Error',`Shopping-Product with ${shprId} don't exist`,'error');
       this.router.navigate(['/shoppingProduct']);
        return throwError(e);
      })
    );
  }
  public delete(shprId:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.delete<any>(this.url+'delete/'+shprId,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Shopping-Product with  ${shprId} don't exist`,'error');
         return throwError(e);
       })
    );

  }
  public save(shprId:ShoppingProduct):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.post<any>(this.url+'save',shprId,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e}`,'error');
         return throwError(e);
      })
    );

  }
  public update(shprId:ShoppingProduct):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.put<any>(this.url+'update',shprId,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Customer with ${shprId.shprId} don't exist`,'error');
         return throwError(e);
       })
    );

  }
}
