import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CourseDialogComponent} from "../course-dialog/course-dialog.component";
import {StoreService} from '../service/store.service';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
     courses:Course[];

     
     //= [{
    //     id: 0,
    //     description: "RxJs In Practice Course",
    //     iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
    //     courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
    //     longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
    //     category: 'BEGINNER',
    //     lessonsCount: 10
    // }];

    constructor(private dialog: MatDialog, private storeservice : StoreService) {
    }

    ngOnInit() {
        this.storeservice.courses$.subscribe(res =>{
            this.courses = res;
        })
    }

    editCourse(course:Course) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = course;

        const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);


    }

}









