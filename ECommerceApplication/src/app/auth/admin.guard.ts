import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // means it's already authenticated
  if (authService.getRole() == "ROLE_ADMIN") {
    return true;
  } else {
    router.navigate['/login'];
    return false;
  }
};
