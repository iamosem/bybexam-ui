import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NO_CREDENTIALS } from '../../app.constants';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isNoCredentials = NO_CREDENTIALS.some(url => url.test(req.url));


    if (isNoCredentials) {
      return next.handle(req);
    } else {

      const token = localStorage.getItem('access_token');
      let clonedRequest = req.clone();
      if (token) {
        clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }
      return next.handle(clonedRequest);
    }
  }
}
