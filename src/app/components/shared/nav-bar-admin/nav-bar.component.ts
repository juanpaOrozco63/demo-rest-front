import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarAdminComponent implements OnInit {

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
