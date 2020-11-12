import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cart-front';
  public isAuthAdmin():boolean{
    return !!localStorage.getItem('token') && !!localStorage.getItem('user') &&localStorage.getItem('type')==='1';
  }
  public isAuthNormal():boolean{
    return !!localStorage.getItem('token') && !!localStorage.getItem('user') &&localStorage.getItem('type')==='0';
  }
  
}
