import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const baseUrl = 'http://localhost:3000/api';
    const accesToken = localStorage.getItem('token');

    let cloneReq = request;
    if(accesToken){
      cloneReq =  request.clone({
        // url : `${baseUrl}${request.url}`,
        setHeaders: {
          Authorization: `Bearer ${accesToken}`
        }
      });
    }
    return next.handle(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
          if(error.status === 401) {
            this.router.navigate(['/user/login'])
          }
          return throwError(error);
      })
    );
  }
}