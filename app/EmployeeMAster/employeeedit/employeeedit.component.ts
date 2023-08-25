import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../EmployeeMaster';
import { EmployeemasterService } from '../employeemaster.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-employeeedit',
  templateUrl: './employeeedit.component.html',
  styleUrls: ['./employeeedit.component.scss']
})
export class EmployeeeditComponent implements OnInit {
 
  model:EmployeeModel
  constructor( private service:EmployeemasterService,private router:Router,private route:ActivatedRoute,private toast:ToastService) { }
  dummyData = ['1', '2', '3'];
  EmployeeMaster=[]
  mindate:Date;
  maxdate:Date;
  joinmax:Date;
  joinmin:Date;
  emplytype:any[]=[];
  AddType:string="";
  dessignationdata:any[]=[];
  des:string="";
  Employeemaster=[]
  ngOnInit(): void {
    this.model = new EmployeeModel();
    this.retrieveEmptyArray()
  }
  onSubmit(){
    let mod = new EmployeeModel();
    mod.EmployeeCode = this.model.EmployeeCode;
    mod.EmployeeName = this.model.EmployeeName;
    mod.EmployeeType = this.model.EmployeeType;
    mod.Designation = this.model.Designation;
    mod.DateofBrith = this.model.DateofBrith;
    mod.DateofJoining = this.model.DateofJoining;
  
    this.EmployeeMaster.push(mod)
    this.service.storeData('Employeemaster',this.EmployeeMaster)
    this.model = new EmployeeModel();
    // this.router.navigate(['/list'], { relativeTo: this.route });
  }

  async retrieveEmptyArray() {
    this.Employeemaster = await this.service.retrieveData('Employeemaster');
    console.log(this.Employeemaster)
  }
  SetDate(){
    const today = new Date();
    this.mindate = new Date(
      today.getFullYear()-60,
      today.getMonth(),
      today.getDate()
    );
    this.maxdate = new Date(
      today.getFullYear()-20,
      today.getMonth(),
      today.getDate()
    )
    this.joinmax = today;
    this.joinmin = new Date(
      today.getFullYear(),
      today.getMonth()-1,
      today.getDate()
    )
  
  }
 AddChild(){
  if(this.model.Spouse == "" || this.model.Spouse == null){
    this.toast.showwarning('Spouse Cannot Be Blank','')
  }else{
    let obj ={
      MarriageStatus:this.model.Marrige,
      Spouse:this.model.Spouse,
      SonDaughter:null,
    }
    this.model.PresonalDet.push(obj);
  }
 }
 AddQualification(){
  // this.names.push('');
  let obj ={
    EduQualification:null
  }
  this.model.qualification.push(obj)
 } 
  
  formvalidationtype(){
    if(this.AddType == ""|| this.AddType == null){
      this.toast.showwarning("Employee Type Cannot Be Blank","")
      return false
    }
    if(this.AddType.trim() == ''){
      this.toast.showwarning('Employee Type  cannot be empty spaces','')
      return false
    }
    return true
  }


  onSubmitType(){
    if(this.formvalidationtype() == true){
      this.emplytype.push(this.AddType)
      this.AddType=''
      this.toast.showsucess('Sucessfully created','')
      console.log(this.emplytype)
    }
    
  }
  validateDesignation(){
    if(this.des == ""  || this.des == null){
      this.toast.showwarning('Designation Cannot Be Blank','')
      return false
    }
    if(this.des.trim() == ''){
      this.toast.showwarning('Designation  cannot be empty spaces','')
      return false
    }
    return true
  }
  OnSubmitDes(){
   if(this.validateDesignation() == true){
    this.dessignationdata.push(this.des)
    this.des=""
    this.toast.showsucess('Sucessfully created','')
    console.log(this.dessignationdata)
  
   }
  }



  openModal(item: any): void {
    // Logic to handle the item click and show modal
    // You can use JavaScript/jQuery to trigger the modal display
  }
}
