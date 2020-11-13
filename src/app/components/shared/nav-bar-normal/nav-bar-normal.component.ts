import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-normal',
  templateUrl: './nav-bar-normal.component.html',
  styleUrls: ['./nav-bar-normal.component.css']
})
export class NavbarnormalComponent implements OnInit {

  constructor(public auth: AngularFireAuth, private route:Router) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.route.navigate(['/login'])
    
  }
}
