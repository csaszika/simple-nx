import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUsername } from '@simple-nx/store';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  store: Store = inject(Store);
  router: Router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectUsername),
      map((username) => !!username), // Check if username exists
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']); // Redirect to login if not authenticated
        }
      })
    );
  }
}
