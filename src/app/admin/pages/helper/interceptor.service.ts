import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isString } from 'util';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService, private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorage.getItem('token');
    if (token && !request.url.includes('/iho/api/auth/authenticate')) {
      request = request.clone({
        headers : request.headers.set('Authorization', 'Bearer '+token)
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            this.localStorage.clear();
            this.router.navigate(['/']);
         }
      }
      if (isString(err)) {
        return throwError(() => new Error(err));
     } else {
      return throwError(() => err?.error);
     }
    
    })
  )
 }
}
