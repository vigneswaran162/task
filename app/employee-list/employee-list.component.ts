import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from '../service/data-sharing.service';
import { EmployeeModel } from '../models/employeedetailsmodel';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = ['EmployeeDetails', 'Designation','DOB', 'Type', 'DOJ','Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isEditButtonDisabled: boolean;
  voidMessage: string;
   
  constructor(private router:Router ,private route:ActivatedRoute ,private datasharing:DataSharingService) { 

  }
   EmployeeData=[];
   dataSource: any;
   _dataListLength:any;
   model:EmployeeModel;
  
  ngOnInit(): void {

  this.model = new EmployeeModel();
  
   this.loadlist()
  }
  async loadlist(){
    let response = []
    response = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'))
    console.log(response)

     this.EmployeeData = response;
      this.dataSource = new MatTableDataSource(this.EmployeeData.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._dataListLength = response.length;
      this.dataSource.paginator.length = response.length;
   
  }

  toggleEditButton() {
    this.isEditButtonDisabled = !this.isEditButtonDisabled;
    this.voidMessage = this.isEditButtonDisabled ? 'Button voided Successfully' : 'Button un-voided Successfully';
  }
  


  onCreate(): void {
    this.router.navigate(['/EmployeeEdit', '0'],{relativeTo:this.route});
  
  }
  Onedit(model){
    this.router.navigate(['/EmployeeEdit', model.EmployeeModel.EmployeeCode], { relativeTo: this.route });
   

  }

}
