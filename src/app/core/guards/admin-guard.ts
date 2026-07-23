import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
   const _authService = inject(Auth);
  const _router = inject(Router);
  if(_authService.isUser() === 'admin'){
 return true
  }
  _router.navigate(['/login']);
  return false;
};
