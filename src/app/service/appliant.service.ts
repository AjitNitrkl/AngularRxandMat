import { Injectable, OnInit } from '@angular/core';
import {Applicant} from '../model/applicant';
import {createHttpObservable} from '../common/util';
import { map ,tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subject, timer} from 'rxjs';
import {Http} from '@angular/http';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';





const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApplicantService  {

  private subject = new BehaviorSubject<Applicant[]>([]);

  user$: Observable<Applicant[]> = this.subject.asObservable();
  usersdata: Applicant[];

  userObservableData: Observable<Applicant[]>;
  observableApplicant: Observable<Applicant>;
  applicant: Applicant;

  private subjectnew = new Subject<Applicant>();
  reloadFlag$: Observable<Applicant[]> = this.subject.asObservable();


 
  constructor(private http: HttpClient) { 
    
   // this.initialize();
  }

  reloadSearchComponent(email:string){
    console.log("Reloaded...");
    this.http.get<Applicant[]>('http://localhost:9000/api/applicant/').subscribe(data =>{
      this.subject.next(data);
    })

  
    //this.subject.next(this.usersdata);
  }

createApplicant(applicant:Applicant){
  this.http.post('http://localhost:9000/api/applicant/', applicant).subscribe(res=>{
    console.log("Data saved",res);
});
}

getApplicantByEmailId(email:String):Observable<Applicant> {
  return this.http.get<Applicant>('http://localhost:9000/api/applicant/email/'+email);
  
}

  //used method actually
  getUsers(){

   
    // return this.http.get('http://localhost:9000/api/users').pipe( 
    //   tap(() => console.log('HTTP request executed')),
    //    map(res => {
    //     console.log("res----"+JSON.stringify(res.json()['payload']));
    //     return res.json()['payload'];
    //   }
      
    //   ));

      return this.http.get<Applicant>('http://localhost:9000/api/users').pipe( 
        tap(() => console.log('HTTP request executed')),
         map(res => {
          console.log("res----"+JSON.stringify(res['payload']));
          return res['payload'];
        }
        
        ));
  }


  getApplicantById(id:number): Observable<Applicant> {
      console.log("id number is",id);
      return this.http.get<Applicant>('http://localhost:9000/api/user/'+id);
      
      // .subscribe(res =>{
      //   console.log ("returned res appl ",res);
      //   this.applicant = res;
      // },
      // (err: HttpErrorResponse) => {
      //   console.log(err.error);
      //   console.log(err.name);
      //   console.log(err.message);
      //   console.log(err.status);
      // });
    }

  initialize() {
     const http$ = createHttpObservable('/api/users');
      http$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        map(res => Object.values(res['payload']))
      )
      .subscribe(
          user => this.subject.next(user)
      );
  }

  getActUserData(){
    return this.user$;
  }


  getUserData(): Observable<Applicant[]>{
    let fakeusers: Applicant[];
    // let fakeusers: Applicant[] =  [
    //   {
    //     id: 0,
    //     name: "Leanne Graham",
    //     username: "Bret",
    //     email: "Sincere@april.biz",
    //     address: {
    //     street: "Kulas Light",
    //     suite: "Apt. 556",
    //     city: "Gwenborough",
    //     zipcode: "92998-3874",
    //     },
    //     phone: "1-770-736-8031",
    //     iconUrl: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/lady.jpg'
    // },{
    // id: 1,
    // name: "Ervin Howell",
    // username: "Antonette",
    // email: "Shanna@melissa.tv",
    // address: {
    // street: "Kulas Light",
    // suite: "Apt. 556",
    // city: "Gwenborough",
    // zipcode: "92998-3874",
    // },
    // phone: "1-770-736-8031",
    // iconUrl: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/lady.jpg'
    // }
    // ];
    console.log("actual users"+this.userObservableData);
    return of(fakeusers);
   
    //this.userObservableData;
  }

  getdata(): Applicant[]{
    console.log("no fetch "+this.usersdata);
    return this.usersdata;
  }
}
