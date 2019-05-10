import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
//import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import {HomeComponent} from "../home/home.component"
import {AboutComponent} from "../about/about.component";
import {CourseComponent} from "../course/course.component";
import {RegisterComponent} from '../register/register.component'
import { ApplicantComponent } from '../applicant/applicant.component';
import { CoursesCardListComponent} from '../courses-card-list/courses-card-list.component'
import { ApplicantDetailsComponent } from '../applicant/applicant-details/applicant-details.component';
import {AuthorizationGuard} from '../authorization-gaurd.ts.service'
import { ApplicantSearchComponent } from '../applicant/applicant-search/applicant-search.component';
import { ApplicantCreateComponent } from '../applicant/applicant-create/applicant-create.component';


const appRoutes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: "login", 
  component: LoginComponent
  },

  { path: "register", 
  component: RegisterComponent
  },
  {
    path: "applicants",
    component: ApplicantComponent,
    canActivate: [AuthorizationGuard] 

},
{
    path: "create",
    component: ApplicantCreateComponent,
    

},
{   path: 'applicant-details/:id', 
    component: ApplicantDetailsComponent ,
    canActivate: [AuthorizationGuard] 
},
{
    path: "about",
    component: AboutComponent,
    canActivate: [AuthorizationGuard] 
},
{
    path: 'courses/:id',
    component: CourseComponent,
    canActivate: [AuthorizationGuard] 
},
{
    path: 'courses',
    component: CoursesCardListComponent,
    canActivate: [AuthorizationGuard] 
},
{
    path: "search",
    component: ApplicantSearchComponent,
},
{
    path: "**",
    redirectTo: '/login'
},


];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
