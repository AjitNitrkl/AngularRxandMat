import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Applicant } from '../../model/applicant';
import { ApplicantService } from '../../service/appliant.service';

@Component({
  selector: 'applicant-create',
  templateUrl: './applicant-create.component.html',
  styleUrls: ['./applicant-create.component.scss']
})
export class ApplicantCreateComponent implements OnInit {


  title = 'materialApp';  
  value=0; 
   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   applicant: Applicant;
   constructor(private _formBuilder: FormBuilder, private applicantService: ApplicantService ) {}
   ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
         fname: ['', Validators.required],
         lname: ['', Validators.required],
         ssn: ['', Validators.required],
         email: ['', Validators.required],
         mobile: ['', Validators.required],

      });
      this.secondFormGroup = this._formBuilder.group({
         secondCtrl: ['', Validators.required]
      });
   }

  /* 
  An alternate way---
  formone.ngSubmit.emit() -- on button click
  (ngSubmit)="form1(formone)"  ---on form
  form1(f:NgForm){
     console.log("form submitted",f.value.email);
     console.log("Applicant submitted", this.firstFormGroup.value.email);
     //this.applicant = new Applicant(this.firstFormGroup.value);
     this.applicant = new Applicant(1, this.firstFormGroup.value.fname,  
      this.firstFormGroup.value.lname, this.firstFormGroup.value.email);
     console.log("Applicant now is", this.applicant);
   } */


   submit(){
    console.log("Applicant submitted", this.firstFormGroup.value);
     this.applicant = new Applicant(1, this.firstFormGroup.value.fname,  
      this.firstFormGroup.value.lname, this.firstFormGroup.value.email);
     console.log("Applicant now is", this.applicant);
     this.applicant.status="SUBMITTED";
     this.value = 100;
     this.applicantService.createApplicant(this.applicant);
   }

   nextAction(){
     this.value = this.value + 33;
     console.log("next clicked");
   }

}
