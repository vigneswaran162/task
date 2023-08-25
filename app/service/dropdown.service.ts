import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http:HttpClient) { }

  EmployeeTypeCreate(data:any){
   return this.http.post("http://localhost:3000/EmployeeType",data)
  }
  DesignationTypeCreate(data:any){
    return this.http.post("http://localhost:3000/DesignationType",data)
   }


 async GetEmployeeTypeCreate(){
   const response = await this.http.get("http://localhost:3000/EmployeeType").toPromise()
   return response
  }

  async GetDesignationTypeCreate(){
    const response = await this.http.get("http://localhost:3000/DesignationType").toPromise()
    return response
   }

   SpouseTypeCreate(data:any){
    return this.http.post("http://localhost:3000/SpouseType",data)
   }


 async GetSpouseTypeCreate(){
   const response = await this.http.get("http://localhost:3000/SpouseType").toPromise()
   return response
  }

  DependentTypeCreate(data:any){
    return this.http.post("http://localhost:3000/DependentType",data)
   }


 async GetDependentTypeCreate(){
   const response = await this.http.get("http://localhost:3000/DependentType").toPromise()
   return response
  }

}
