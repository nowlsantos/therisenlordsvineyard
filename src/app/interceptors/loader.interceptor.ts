import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const loaderService = this.injector.get(LoaderService);
        loaderService.show();
        console.log('Loader Intercept:', loaderService.isLoading);

        return next.handle(request).pipe(
            // delay(2000),
            finalize(() => {
                loaderService.hide();
                console.log('Loader Intercept:', loaderService.isLoading);
            })
        );
    }
}
