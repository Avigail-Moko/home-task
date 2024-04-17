import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private dialogOpened: boolean = false;
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const password = route.queryParams['password'];
    if (password === 'reflectiz147') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
