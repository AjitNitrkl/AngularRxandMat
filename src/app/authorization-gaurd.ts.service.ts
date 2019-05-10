import { Injectable } from '@angular/core';


import {tap, first, map} from 'rxjs/operators';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./service/auth.service";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements  CanActivate {


  constructor(public authService: AuthService, public router: Router) {}


    canActivate(): boolean {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }

}