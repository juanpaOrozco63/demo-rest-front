import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Product } from '../domain/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string='http://localhost:9090/api/product/';
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
  public findById(proId:string):Observable<any>{
    return this.httClient.get<any>(this.url+'findById/'+proId).pipe(
      catchError(e=>{
        Swal.fire('Error',`Produc ${proId} don't exist`,'error');
        this.router.navigate(['/products']);
         return throwError(e);
       })
    );
  }
  public delete(proId:string):Observable<any>{
    return this.httClient.delete<any>(this.url+'delete/'+proId).pipe(
      catchError(e=>{
        Swal.fire('Error',`Product  ${proId} don't exist`,'error');
         return throwError(e);
       })
    );

  }
  public save(product:Product):Observable<any>{
    return this.httClient.post<any>(this.url+'save',product,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e.error.error}`,'error');
         return throwError(e);
      }));

  }
  public update(product:Product):Observable<any>{
    return this.httClient.put<any>(this.url+'update',product,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Product with ${e.error.error}`,'error');
         return throwError(e);
      }));

  }

}
  