import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Applicant } from '../../model/applicant';
import { ActivatedRoute } from '@angular/router'
import { ApplicantService } from '../../service/appliant.service';

@Component({
  selector: 'applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  applicant:Applicant;
  imageSrc:string;
  applicantName: string;
  applicantEmail: string;

  constructor(private route: ActivatedRoute, private applicantService: ApplicantService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.applicantService.getApplicantById(this.id).subscribe(res =>{
      console.log("Did it return applicant", res);
      this.applicant = res;
      this.imageSrc = res.iconUrl;
      this.applicantName = res.username;
      this.applicantEmail = res.email;
    });
    // this.applicantService.getApplicantById(this.id).subscribe(applicant =>{
    //  this.applicant = applicant;
    //   console.log("Retrieved applicant ", applicant);
    // })
  }

  //@Input() applicant:Applicant;
 // @Output() onChange:EventEmitter<Applicant> = new EventEmitter();

}

