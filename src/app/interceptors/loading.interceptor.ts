import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Interceptor çalıştı...');
    // this.loadingService.startLoading();
    return next.handle(request).pipe(
      finalize(() => {
        // this.loadingService.stopLoading();
        console.log('İstek bitti');
      })
    );
  }
}
