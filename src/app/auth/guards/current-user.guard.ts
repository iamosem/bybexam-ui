import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, lastValueFrom, of, timeout } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';

export const currentUserGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);

  try {
    console.log('Requesting current user...');
    const currentUser: UserDetails = await lastValueFrom(
      authService.getUser().pipe(
        timeout(5000),
        catchError(err => {
          console.error(`Error fetching user: ${err.message}`);
          return of(null); // Return null in case of error
        })
      )
    );
    if (currentUser) userService.user = currentUser;
  } catch (err) {
    console.error(`User not logged in: ${err.message}`);
  }

  return true;
};
