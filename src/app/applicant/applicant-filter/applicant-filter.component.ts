import { Component, OnInit, Input } from '@angular/core';
import {Applicant} from '../../model/applicant';
import {Observable, of} from 'rxjs';
import { BehaviorSubject, Subject} from "rxjs";
import { MatSort, MatDialogConfig,MatDialog, MatSortable, MatTableDataSource } from '@angular/material';
import { Search } from '../../model/search';
import { ApplicantService } from '../../service/appliant.service';


@Component({
  selector: 'applicant-filter',
  templateUrl: './applicant-filter.component.html',
  styleUrls: ['./applicant-filter.component.scss']
})
export class ApplicantFilterComponent implements OnInit {

  delUser: Applicant[];
  dataSource =new MatTableDataSource();
  displayedColumns = ['name', 'email', 'phone', 'username', 'action','deleteAction'];
  applicant:Applicant;


  @Input() searchData: Search;

 
  constructor(private applicantService : ApplicantService) { }

  ngOnInit() {
    //this.deleteUser();
    this.applicantService.reloadFlag$.subscribe(data =>{
      this.dataSource.data = data;
    })
    console.log(" Received data", this.searchData);
   console.log("Received data by mail",this.searchData.email);


   this.applicantService.getApplicantByEmailId(this.searchData.email).subscribe(res =>{
     this.applicant = res;
   })
   console.log("Received email", this.applicant);

  //  this.applicantService.reloadFlag$.subscribe(res=>{
  //    console.log("Reloaded....")
  //   window.location.reload();
  // })

  }


  deleteUser(){

    // need to invoke api to delete an user the subscribe get data api to get
   this.delUser =[{
      id: 2,
      name: "Sachin Tendulkar",
      username: "The Master",
      email: "sachin.ten@bcci.tv",
      address: {
        street: "Kulas Light",
        suite: "B200",
        city: "Gwenborough",
        zipcode: "92998-3874",
      },
      status:"Apprved",
      phone: "1-770-736-8031",
      iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDbrOYk8fvoeFfR41GfbWB5cbg1OmkPVNitJH0ROmZoUcYE2h'
  },
  {
    id: 3,
    name: "virat Kohli",
    username: "The King",
    email: "virat.kohli@bcci.tv",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
    },
    status:"Approved",
    phone: "1-770-736-8031",
    iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBq1epg7Pcb9ORmDzn28HHmbQcnkiy2g_GDmEIyaK-eiQ-fWCy'
},
{
    id: 4,
    name: "Rahul Dravid",
    username: "The wall",
    email: "rahul.dravid@bcci.com",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
    },
    status:"Approved",
    phone: "1-770-736-8031",
    iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7Olj6CFAIqzxkLiI3g8ch-CBgB6k0Ke5IJbg5NGKZQWyCxVFKg'
},




];
  
    of(this.delUser).subscribe( res =>{
      this.dataSource.data = res;
    })
  
  }

}
