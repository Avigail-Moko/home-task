import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AiCarDealershipService } from '../ai-car-dealership.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss'],
})
export class AdminDialogComponent {
  constructor(
    private dialog: Dialog,
    private router: Router,
    private aiCarDealership: AiCarDealershipService,
    private authGuard: AuthGuardService
  ) {}
  userPassword: String = '';
  hide = true;

  isAdmin() {
    this.router
      .navigate(['/data-chart'], {
        queryParams: { password: this.userPassword },
      })
      .then((success) => {
        if (success) {
          sessionStorage.setItem('isadmin', 'isadmin');
          this.dialog.closeAll();
        } else alert('wrong password. please try again');
      });
  }
}
