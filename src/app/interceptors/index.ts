import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ErrorInterceptor } from './error.interceptor';
// import { TokenInterceptor } from './token.inteceptor';
import { LoaderInterceptor } from './loader.interceptor';

export const InterceptorProviders = [
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: ErrorInterceptor,
    //     multi: true
    // },
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: TokenInterceptor,
    //     multi: true
    // },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true
    }
];
