import { Component, OnInit, Inject } from '@angular/core';
import {ApplicantService} from '../service/appliant.service'
import {Applicant} from '../model/applicant';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import * as moment from 'moment';



@Component({
  selector: 'applicant-dialog',
  templateUrl: './applicant-dialog.component.html',
  styleUrls: ['./applicant-dialog.component.scss']
})
export class ApplicantDialogComponent implements OnInit {
  form: FormGroup;
  applicant: Applicant

  constructor(private userService: ApplicantService, @Inject(MAT_DIALOG_DATA)  applicant:Applicant,
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<ApplicantDialogComponent>, ) { 
    console.log("user data ----"+JSON.stringify(applicant));

    this.form = fb.group({
      name: [applicant.name, Validators.required],
      email: [applicant.email, Validators.required],
      releasedAt: [moment(), Validators.required],
      phone: [applicant.phone,Validators.required]
  });

  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
}


}
