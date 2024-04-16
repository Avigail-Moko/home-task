import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss'],
})
export class AdminDialogComponent {
  constructor(private dialog: Dialog, private router: Router) {}
  password = 'reflectiz147';
  userPassword: String = '';
  hide = true;

  isAdmin() {
    // console.log(this.userPassword)
    if (this.userPassword === this.password) {
      this.dialog.closeAll();
      this.router.navigate(['/data-chart']);
    }else alert("try again")
  }
}
