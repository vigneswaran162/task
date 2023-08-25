import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemasterComponent } from './itemaster/itemaster.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { ItemMasterReportComponent } from './item-master-report/item-master-report.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeeditComponent } from './EmployeeMAster/employeeedit/employeeedit.component';
import { EmployeelistComponent } from './EmployeeMAster/employeelist/employeelist.component';
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path:'',
    component:NavigationbarComponent
  }
  
  ,

{
  path:"ItemList",
  component:ItemlistComponent
},
{
  path:"itemedit/:itemdescription",
  component:ItemasterComponent
},
{
  path:'Report',
  component:ItemMasterReportComponent
},
{
  path:'EmployeeList',
  component:EmployeeListComponent
},{
  path:"EmployeeEdit/:id",
  component:EmployeeEditComponent
}
,{
  path:'**',
  component:PagenotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
