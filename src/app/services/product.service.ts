import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Product } from '../domain/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})  
export class ProductService {

  private url:string=environment.apiUrl+'api/product/';
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
  public findById(proId:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'findById/'+proId,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Produc ${proId} don't exist`,'error');
        this.router.navigate(['/products']);
         return throwError(e);
       })
    );
  }
  public delete(proId:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.delete<any>(this.url+'delete/'+proId,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Product  ${proId} don't exist`,'error');
         return throwError(e);
       })
    );

  }
  public save(product:Product):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.post<any>(this.url+'save',product,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`${e.error.error}`,'error');
         return throwError(e);
      }));

  }
  public update(product:Product):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.put<any>(this.url+'update',product,{headers: headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Product with ${e.error.error}`,'error');
         return throwError(e);
      }));

  }
  public filterName(name:string):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'filterName/'+name,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Produc ${name} don't exist`,'error');
         return throwError(e);
       })
    );
  }
  public filterPrice(p1:number,p2:number):Observable<any>{
    let headers=this.createTokenHeader();

    return this.httClient.get<any>(this.url+'filterPrice/'+p1+"/"+p2,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Produc between ${p1} and ${p2} don't exist`,'error');
         return throwError(e);
       })
    );
  }

}
  