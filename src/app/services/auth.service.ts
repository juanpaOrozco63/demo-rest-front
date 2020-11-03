import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { User } from '../domain/user';
import { Observable } from 'rxjs';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string= environment.apiUrl+'login';
  constructor(public httpClient:HttpClient) { }
  public loginUser(user:User):Observable<any>{
    return this.httpClient.post(this.url,user);
  }
  public loggedIn():boolean{
    return !!localStorage.getItem('usuario');
  }
  public logOut():void{
    localStorage.removeItem('usuario');
  }
}
