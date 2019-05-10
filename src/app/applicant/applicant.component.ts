import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {ApplicantService} from '../service/appliant.service';
import {Observable, of} from 'rxjs';
import {Applicant} from '../model/applicant';
import {Router} from '@angular/router'
import { MatSort, MatDialogConfig,MatDialog, MatSortable, MatTableDataSource } from '@angular/material';
import {ApplicantDialogComponent} from '../applicant-dialog/applicant-dialog.component'



@Component({
  selector: 'applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss'],
  providers:[]
})
export class ApplicantComponent implements OnInit {

   dataSource =new MatTableDataSource();
  userdata:Applicant[];
  delUser: Applicant[];
 
  displayedColumns = ['name', 'email', 'phone', 'username', 'iconUrl', 'action','deleteAction'];

  constructor(private dialog: MatDialog, private service: ApplicantService,
     private router:Router) { 
   
  }
  getUsersList(){
    //http call using button click
   this.service.getUsers().subscribe((res) =>{
    this.dataSource.data = res;
   })
  }

  ngOnInit() {

    // http call using fetch API
  //  this.service.getActUserData().subscribe(data =>{
  //   this.dataSource.data = data;
  // });
//http call using http client
  this.service.getUsers().subscribe((res) =>{
    this.dataSource.data = res;
    console.log("get data" +this.userdata);
   })
 }



  getUsers(){
    this.service.getUserData().subscribe(res =>  this.dataSource.data = res as Applicant[]);
  }


  editUser(user:Applicant) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(ApplicantDialogComponent, dialogConfig);

}


onClickRow(row:Applicant){
  console.log("clicked row", row)
  this.router.navigate(['/applicant-details', row.id]);
}

deleteUser(user:Applicant){

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
}];

  of(this.delUser).subscribe( res =>{
    this.dataSource.data = res;
  })

}



}
///below is not used just for fyi
export class UserDataSource extends DataSource<any> {
  constructor(private service: ApplicantService) {
    super();
  }
  connect(): Observable<Applicant[]> {
    
    console.log("service returned data--"+JSON.stringify(this.service.getUserData()));
    return this.service.getUserData();
  }
  disconnect() {}
}
