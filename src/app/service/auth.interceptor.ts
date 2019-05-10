
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Injectable, } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");
        console.log("from header", idToken);
        if (idToken) {
            //http req is immutable so need to clone it
            console.log("from header again");
            const clonedRequest = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
                    
            });
            console.log("from header", clonedRequest);
            return next.handle(clonedRequest);
        }
        else {
            return next.handle(req);
        }
    }
}