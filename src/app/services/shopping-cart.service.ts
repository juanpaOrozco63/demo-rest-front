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
  public delete(carId:number):Observable<any>{
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
  public createCart(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'createCart/'+email,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`The Shopping card cannot be created ${e}`,'error');
         return throwError(e);
       })
    );
  }
  public addProduct(carId:number,proId:string,quantity:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'addProduct/'+carId+"/"+proId+"/"+quantity,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Product with proId: ${proId} could not be added in to carId: ${carId} error ${e}`,'error');
         return throwError(e);
       })
    );
  }
  public removeProduct(carId:number,proId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.delete<any>(this.url+'removeProduct/'+carId+"/"+proId,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Product with proId: ${proId} could not be removen in to carId: ${carId}`,'error');
         return throwError(e);
       })
    );
  }
  public clearCart(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.delete<any>(this.url+'clearCart/'+carId,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Shopping Cart with carId: ${carId} could not remove ${e} `,'error');
         return throwError(e);
       })
    );
  }
  public findShoppingProductByShoppingCart(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.put<any>(this.url+'findShoppingProductByShoppingCart/'+carId,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Shopping Cart with carId: ${carId} don't exist `,'error');
         return throwError(e);
       })
    );
  }
  public findCarIdShoppingCartsByEmail(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'findCarIdShoppingCartsByEmail/'+email,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Shopping Cart with carId: ${e} don't exist `,'error');
         return throwError(e);
       })
    );
  }
  public closeShoppingCart(carId:number,payId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'closeShoppingCart/'+carId+"/"+payId,{headers:headers}).pipe(
      catchError(e=>{
        Swal.fire('Error',`Shopping Cart with carId: ${carId} don't exist `,'error');
         return throwError(e);
       })
    );
  }
}
