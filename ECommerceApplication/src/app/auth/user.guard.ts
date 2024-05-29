import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.getRole() == "ROLE_ADMIN" || "ROLE_USER") {
    return true;
  } else {
    router.navigate['/login'];
    return false;
  }
};
