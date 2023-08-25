
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ItemasterComponent } from './itemaster/itemaster.component';
import { UommasterComponent } from './uommaster/uommaster.component';
import { PosmasterComponent } from './posmaster/posmaster.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { ItemMasterReportComponent } from './item-master-report/item-master-report.component';
import {MatRadioModule} from '@angular/material/radio';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { DataSharingService } from './service/data-sharing.service';
import { EmployeelistComponent } from './EmployeeMAster/employeelist/employeelist.component';
import { EmployeeeditComponent } from './EmployeeMAster/employeeedit/employeeedit.component';
import { EmployeemasterService } from './EmployeeMAster/employeemaster.service';
import { SafePipe } from './pipe';
import { QualificationModalComponent } from './qualification-modal/qualification-modal.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemasterComponent,
    UommasterComponent,
    PosmasterComponent,
    ItemlistComponent,
    ItemMasterReportComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeelistComponent,
    EmployeeeditComponent,
    SafePipe,
    QualificationModalComponent,
    NavigationbarComponent,
    PagenotfoundComponent
  
  ],
  exports: [
    SafePipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut:3000,
        positionClass: 'toast-top-right',
        preventDuplicates:true
       }
    ),
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,  
    MatDatepickerModule,
   MatNativeDateModule,
   MatRadioModule,
  //  DatePipe,
   MatDialogModule,
   MatCheckboxModule,
   MatTableModule,
   TypeaheadModule,
   FormsModule,
   MatTooltipModule,
   MatPaginatorModule,

   
   
  ],
  providers: [DataSharingService,EmployeemasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
