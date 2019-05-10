import {shareReplay, filter, tap, map} from 'rxjs/operators';
import {Injectable, } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject, Subject} from "rxjs";
import {User} from "../model/user";
import * as auth0 from 'auth0-js'
import * as moment from "moment";
import { Router, Routes } from "@angular/router";

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: undefined,
    roles: []
}

export const AUTH_CONFIG ={
   domain:'dev-r7ui0nor.auth0.com',
   clientID: 'VdF5rX8MfVhmzuWZmmEVmPIe92EEGgSl'
};


@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router:Router) {
      if(this.isLoggedIn()){
          this.userInfo();
      }
    }
   
    auth0 =  new auth0.WebAuth({
        // domain: AUTH_CONFIG.domain,
        // clientID: AUTH_CONFIG.clientID,
        // responseType:'token id_token',
        // redirectUri:'http://localhost:4200/applicants'

        clientID: 'VdF5rX8MfVhmzuWZmmEVmPIe92EEGgSl',
        domain: 'dev-r7ui0nor.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/applicants',
        scope: 'openid email'
      });

    private subject = new BehaviorSubject<User>(undefined);
    user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));
    private newSubject = new Subject<boolean>();

    // isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
    // isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

    loggedStatus$: Observable<boolean> = this.newSubject.asObservable();

    signUp() {
        this.auth0.authorize({initialScreen: 'signup'});
    }

    login(email:string, password:string ) {
        console.log("received...");
        this.newSubject.next(true);
        //this.retrieveAuthInfoFrmUrl();
        this.auth0.authorize({initialScreen: 'login'});
        


    }


    retrieveAuthInfoFrmUrl(){
        this.auth0.parseHash((err,authResult) =>{
            if(err){
                console.log("Authentication failure ", err);
                return;
            }else if(authResult)
                console.log("Authentication Success" , authResult);
                this.setSession(authResult);
        }); 
        this.userInfo();
       //this.newSubject.next(false);
    }

    private setSession(authResult) {
        if(authResult){
            const expiresAt = moment().add(authResult.expiresIn,'second');
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
            window.location.reload();
        }   
    }   

    userInfo(){
        return this.http.post<User>('/api/userinfo', null).pipe(
            shareReplay(),
            tap(user => this.subject.next(user)),);
    }

    public isLoggedIn(){
        return moment().isBefore(this.getExpiration());
    }

    public isLoggedOut(){
        return !this.isLoggedIn();
    }

    getExpiration(){
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

     

    
    loginAsUser(email:string) {
        return this.http.post<User>('/api/admin', {email}).pipe(
            shareReplay(),
            tap(user => this.subject.next(user)),);
    }

    logout() //: Observable<any> {
        {
            this.newSubject.next(false);
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        window.location.href ='https://dev-r7ui0nor.auth0.com/v2/logout?returnTo=http://localhost:4200/login&client_id=VdF5rX8MfVhmzuWZmmEVmPIe92EEGgSl'
        //this.router.navigate(["/login"]);

        // return this.http.post('/api/logout', null).pipe(
        //     shareReplay(),
        //     tap(user => this.subject.next(ANONYMOUS_USER)),);
    }


    getStatus(page:string):boolean{
        if(page === "SEARCH")
            return false;
        return true;
    }
}
