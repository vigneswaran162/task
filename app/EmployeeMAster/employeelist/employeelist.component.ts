import { Component, OnInit } from '@angular/core';
import { EmployeemasterService } from '../employeemaster.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  constructor(private service:EmployeemasterService) { }
   
  Employeemaster=[]

  ngOnInit(): void {
   this.retrieveEmptyArray()
  }
   async retrieveEmptyArray() {
    this.Employeemaster = await this.service.retrieveData('Employeemaster');
    console.log(this.Employeemaster)
  }

}
