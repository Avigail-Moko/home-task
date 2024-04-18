import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { AuthGuardService } from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private dialog: Dialog,
    private authGuard: AuthGuardService
  ) {}

  sessionStorage = window.sessionStorage;

  flag = false;
  title = 'home-task';
  createRouter() {
    this.router.navigate(['/data-chart']);
    this.flag = true;
  }

  goForward() {
    this.router.navigate(['/']);
    this.flag = false;
    sessionStorage.removeItem('isadmin');
  }
  openDialog() {
    this.dialog.open(AdminDialogComponent);
  }
}
