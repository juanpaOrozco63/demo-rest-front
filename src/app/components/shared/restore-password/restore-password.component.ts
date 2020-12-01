import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
})
export class RestorePasswordComponent implements OnInit {
  public title: string = 'Restore Password';

  email: string = '';
  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {}

  restore(): void {
    this.auth.sendPasswordResetEmail(this.email);
    Swal.fire(
      'Restore password',
      `Customer ${this.email} we have sent you an email to reset your password`,
      'success'
    )
  }
}
