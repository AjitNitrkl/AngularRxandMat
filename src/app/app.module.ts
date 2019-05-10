import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import {CourseComponent} from "./course/course.component";

import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MaterialModule} from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ApplicantComponent } from './applicant/applicant.component';

import {ApplicantService} from './service/appliant.service'
import {HttpModule} from '@angular/http';
import { ApplicantDialogComponent } from './applicant-dialog/applicant-dialog.component';
import {AuthService} from './service/auth.service';
import {AuthInterceptor} from './service/auth.interceptor';
import {StoreService} from './service/store.service';
import { ApplicantDetailsComponent } from './applicant/applicant-details/applicant-details.component';
import { ApplicantSearchComponent } from './applicant/applicant-search/applicant-search.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ApplicantFilterComponent } from './applicant/applicant-filter/applicant-filter.component';
import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { ApplicantCreateComponent } from './applicant/applicant-create/applicant-create.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        CourseComponent,
        CoursesCardListComponent,
        CourseDialogComponent,
        LoginComponent,
        RegisterComponent,
        ApplicantComponent,
        ApplicantDialogComponent,
        ApplicantDetailsComponent,
        ApplicantSearchComponent,
        NavigationComponent,
        ApplicantFilterComponent,
        CheckboxComponent,
        SidebarComponent,
        DatepickerComponent,
        ApplicantCreateComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        HttpModule
    ],
    providers: [
        {
            provide:HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi:true //can be multiple http interceptor organised togather as chain
        },
        ApplicantService,
        AuthService,
        StoreService,
        

    ],
    bootstrap: [AppComponent],
    entryComponents: [CourseDialogComponent, ApplicantDialogComponent]
})
export class AppModule {
}
