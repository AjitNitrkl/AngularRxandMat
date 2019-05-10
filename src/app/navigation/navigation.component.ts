import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
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
