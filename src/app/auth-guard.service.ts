import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { Observable, of, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private dialogOpened: boolean = false;
  constructor(
    private router: Router,
    private dialog:MatDialog
  ) {}
  

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   const url: string = state.url;
  //   // בדיקה האם המשתמש ניסה להגיע לניתוב ישירות מה-URL
  //   if (url === '/data-chart') {
  //     const dialogRef = this.dialog.open(AdminDialogComponent,{closeOnNavigation: true});
  //      // הוסף את זה
  //     return dialogRef.afterClosed().pipe(
  //       take(1),
  //       switchMap((result: boolean) => {
  //         if (result === true) {
  //           // הסיסמה הוזנה בהצלחה, מאפשרים את הניווט
  //           this.router.navigate(['/data-chart']);
  //           return of(true);
  //         } else {
  //           // המשתמש בחר שלא להזין סיסמה, מנתקים אותו מהניתוב
  //           this.router.navigate(['/']);
  //           return of(false);
  //         }
  //       })
  //     );
  //   }
  //   return of(true);
  // }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (window.location.pathname === '/data-chart') {
      const dialogRef = this.dialog.open(AdminDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.router.navigate(['/data-chart']);
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
    }
    return true;
  }
  
}
