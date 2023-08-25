import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  constructor( ) { }



  SetEmployeData(data){
    let array =[]

    if (localStorage.getItem('EMPLOYEE_DETAILS')){
      array = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'));
      const _arrfilter = array.filter(arr => arr.EmployeeModel.EmployeeCode.toLowerCase() == data.EmployeeModel.EmployeeCode.toLowerCase());
      if(_arrfilter.length>0){
        const _indexof = array.indexOf(arr => arr.EmployeeModel.EmployeeCode.toLowerCase() == data.EmployeeModel.EmployeeCode.toLowerCase());
        array.splice(_indexof,1);
        array = [data,...array];
      }else{
      //   array = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'));
      // const _arrfilter = array.filter(arr => arr.EmployeeModel.EmployeeCode.toLowerCase() == data.EmployeeModel.EmployeeCode.toLowerCase());
  
        array = [data,...array];
      }
      
      }
      else{
        array = [data];
  
      }
      localStorage.setItem('EMPLOYEE_DETAILS', JSON.stringify(array));
  }







  // SetEmployeData(data){
  //   let array =[]
  //   if(localStorage.getItem('EMPLOYEE_DETAILS'))
  //  {
  //   array = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'))
  //   array = [data,...array]
  //  }
  //   else{
  //     array[data]
  //   }
  //   localStorage.setItem('EMPLOYEE_DETAILS',JSON.stringify(array))
  // }
  
  
GetEmployeeData(){
  localStorage.getItem('EMPLOYEE_DETAILS')
}

}
