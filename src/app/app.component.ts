import {Component, OnInit} from '@angular/core';
import {StoreService} from './service/store.service';
import { ApplicantService } from './service/appliant.service';
import {AuthService} from './service/auth.service'
import {Observable, BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{

    private isAuth: boolean  ;
    // isLoggedIn$: Observable<boolean>;
    // isLoggedOut$: Observable<boolean>;

    loggedStatus$ : Observable<boolean>;


    constructor(private store:StoreService, private service: ApplicantService, private authService:AuthService) {

    }

    ngOnInit() {
        this.store.init();
        this.authService.retrieveAuthInfoFrmUrl();
       // this.service.ngOnInit();
       this.loggedStatus$ = this.authService.loggedStatus$;
       this.loggedStatus$.subscribe(val => {
           this.isAuth = val;
        console.log("value of is logged status ", val);
        localStorage.setItem('loggedstatus', val.toString());
    });
       
       //console.log("Logged in status", this.isAuth);
        
     //  this.isLoggedIn$ = this.authService.isLoggedIn$;
      // this.isLoggedOut$ = this.authService.isLoggedOut$;

      
    //    this.isLoggedIn$.subscribe(val => {
    //        console.log("value of is logged in ", val);
    //    })

    //    this.isLoggedOut$.subscribe(val => {
    //     console.log("value of is logged out ", val);
    // })
    //    this.authService.isLoggedIn$.subscribe(authstaus=>{
    //     this.isAuth = authstaus;
    // });
     
    }

    logout(){
        console.log("logging out");
        this.authService.logout();
    }

    login(){
        this.authService.login('','');
       
    }

    signUp(){
        this.authService.signUp(); 
    }

    

   

}
