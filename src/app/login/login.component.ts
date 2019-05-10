import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Applicant} from '../model/applicant';
import {createHttpObservable} from '../common/util';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {ApplicantService} from '../service/appliant.service'
import { AuthService } from '../service/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[]
})
export class LoginComponent implements OnInit {

  f:FormGroup;
  constructor(private authService:AuthService, private fb:FormBuilder)  {

    this.f = this.fb.group({
      email: ['test@gmail.com',Validators.required],
      password: ['Password10',Validators.required]
  });

} 

  
  ngOnInit() {
   // this.service.ngOnInit();
   
  }
  submit(form: NgForm){
  // this.service.getdata();
  }

  login() {

    const val = this.f.value;
    if (val.email && val.password) {
      console.log("submitted val"+val.email);
        this.authService.login(val.email, val.password);
           

    }
  }

}
