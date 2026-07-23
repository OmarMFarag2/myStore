import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const _router=inject(Router);
  const _authService = inject(AuthService);

  return next(req).pipe(catchError((error)=>{
    console.error(error);
    if(error.status === 401){
      _authService.logout();
      _router.navigate(['/login']);
    }
    else if(error.status === 403){
      _router.navigate(['/login']);
    }
     else if(error.status === 404){
      _router.navigate(['/notfound']);
    }
    else{
      alert('something went wrong')
    }
    return throwError(()=> error);
  }));
};
