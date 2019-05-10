import { NgModule } from '@angular/core';
import {MatButtonModule, 
    MatIconModule, 
    MatDatepickerModule, 
    MatFormFieldModule,
    MatNativeDateModule, 
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,

    MatDialogModule,
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSelectModule,
   MatSortModule,
   MatTableModule,

   MatMenuModule,
   MatCardModule,
   MatTabsModule,
   MatTableDataSource,
   MatGridListModule,
   MatTooltipModule,
   MatStepperModule,
   MatProgressBarModule
   
    
    
} from '@angular/material'
import {MatMomentDateModule} from "@angular/material-moment-adapter";


@NgModule({
    imports:[MatMomentDateModule, MatMenuModule,
        MatCardModule,
        MatTabsModule, MatDialogModule,
        MatPaginatorModule, 
        MatProgressSpinnerModule, 
        MatSelectModule,
       MatSortModule,
       MatTableModule,MatListModule,MatSidenavModule,MatToolbarModule,MatCheckboxModule,
       MatButtonModule,MatIconModule,MatDatepickerModule,MatFormFieldModule,
       MatNativeDateModule,MatInputModule,
       MatGridListModule, MatTooltipModule,MatStepperModule, MatProgressBarModule],
    exports:[ MatMomentDateModule, MatMenuModule,
        MatCardModule,
        MatTabsModule,MatDialogModule,
        MatPaginatorModule, 
        MatProgressSpinnerModule, 
        MatSelectModule,
       MatSortModule,
       MatTableModule,MatListModule, MatSidenavModule,MatToolbarModule,MatCheckboxModule,
       MatButtonModule,MatIconModule,MatDatepickerModule,MatFormFieldModule,MatNativeDateModule,
       MatInputModule,MatGridListModule, MatTooltipModule,MatStepperModule, MatProgressBarModule]
}
    
)
export class MaterialModule{

}