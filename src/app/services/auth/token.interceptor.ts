
import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `${window.localStorage.getItem('auth_key')}`
            }
        });

        return next.handle(req).catch((err, source) => {
            if (err.status  == 401) {
                   this.router.navigate(['/login']);
                   return Observable.empty();
               } else {
                   return Observable.throw(err);
           }  
           });
    }
}