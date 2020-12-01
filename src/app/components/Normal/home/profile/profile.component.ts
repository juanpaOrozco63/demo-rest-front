import { Component, OnInit } from '@angular/core';
import { customerModel } from '../../../../models/customer.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  customer = new customerModel();
  
  constructor(
    public auth: AngularFireAuth,
    public customerService: CustomerService,
    private route: Router
  ) {}
  public clientFirebase: Subscription = new Subscription();

  ngOnInit(): void {
    this.clientFirebase = this.auth.user.subscribe((userFirebase) => {
      this.customer.email = userFirebase.email;
      this.findById(this.customer.email);
    });
  }
  ngOnDestroy(): void {
    this.clientFirebase.unsubscribe();
  }
  update() {
    this.customerService.update(this.customer).subscribe((rsp) => {
      this.route.navigate(['/profileNormal']);
      Swal.fire(
        'Customer Update',
        `Customer ${this.customer.email} update successfull`,
        'success'
      );
    });
  }
  findById(email: string): void {
    this.customerService.findById(email).subscribe(
      (data) => {
        this.customer = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  sendPasswordResetEmail(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
}
