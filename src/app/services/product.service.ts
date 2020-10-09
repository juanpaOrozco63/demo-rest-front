import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string='http://localhost:9090/api/product/';
  constructor(public httClient:HttpClient) { }
  public findAll():Observable<any>{
    return this.httClient.get(this.url+'findAll');
  }
  public findById(proId:string):Observable<any>{
    return this.httClient.get(this.url+'findById/'+proId);
  }
  public delete(proId:string):Observable<any>{
    return this.httClient.delete(this.url+'delete/'+proId);

  }
}
