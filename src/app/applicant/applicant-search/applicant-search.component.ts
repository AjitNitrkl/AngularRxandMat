import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Applicant } from '../../model/applicant';
import {Observable, of} from 'rxjs';
import { BehaviorSubject, Subject} from "rxjs";
import { Search } from '../../model/search';
import { CheckboxList } from '../../model/checkbox.model';
import { ApplicantFilterComponent } from '../applicant-filter/applicant-filter.component';
import { ApplicantService } from '../../service/appliant.service';

@Component({
  selector: 'applicant-search',
  templateUrl: './applicant-search.component.html',
  styleUrls: ['./applicant-search.component.scss']
})
export class ApplicantSearchComponent implements OnInit {

  @ViewChild('f') form: any;
  private subject = new Subject<boolean>();
  searchFlag$: Observable<boolean> = this.subject.asObservable();
  filterData: Search;
  filters: CheckboxList[] = [];
  public onChangeFilters : Function;
//  @ViewChild('ApplicantFilterComponent') applicantFilterComponet;
  //private applicantFilterComponet:ApplicantFilterComponent;

  cards = [  
    // { title: 'Card 1', cols: 2, rows: 1 },  
     { title: 'Card 2', cols: 1, rows: 2 },  
     { title: 'Card 3', cols: 2, rows: 2 },  
     //{ title: 'Card 4', cols: 1, rows: 1 }  
   ];  
 
   status = ['Inprogress', 'Submitted', 'Approved', 'Denied'];
   applicant = new Applicant(1,'Ajit', 'Ajit Behera','ajit.nitrkl@gmail.com');

  constructor(private service:ApplicantService) { }

  ngOnInit() {
    this.onChangeFilters = this.callBackFunction.bind(this);
    this.subject.next(false);
    this.filters= [{
      "name": "status",
      "title": "By Status",
      "defaultCheckboxName": "in_review",
      "checkboxes": [{"className":"status_warning","isChecked":false, "label": "Performing DMS","name":"processing dms","tooltip":"Temproray status while application in process", "value":"processing dms" },
      {"className":"status_success","isChecked":false, "label": "Approved","name":"Approved","tooltip":"application in approved", "value":"App Approved" },
      {"className":"status_error","isChecked":false, "label": "Declined","name":"Declined","tooltip":" application in declined", "value":"App Declined" }]
    }];
  }

  callBackFunction(){
    console.log("call back function invoked");
    this.service.reloadSearchComponent(this.form.value.email);
  }

  onSubmit(){
    if (this.form.valid) {
      console.log("Form Submitted!");
      
      console.log(this.form.value.name);
      this.subject.next(true);
      this.filterData = Object.assign({}, this.form.value);
      console.log('filter data', this.filterData);
      
      this.form.reset();
      this.service.reloadSearchComponent(this.form.value.email);
      

    }
  }

}
