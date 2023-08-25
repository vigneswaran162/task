import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ToastService } from '../service/toast.service';
import { EmployeeMasterModel, EmployeeModel, Employeeupload,Qualificationmodel,QualifictionDetModel, SpouseDetail, personaldetmodel } from '../models/employeedetailsmodel';
import { Router,ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../service/data-sharing.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DropdownService } from '../service/dropdown.service';

import { DependentModel } from '../models/DependentModel';
import { FileUploadModel } from '../EmployeeMAster/EmployeeMaster';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('qualificationModal') qualificationModal: ElementRef;
  model:EmployeeMasterModel;
  spouseModel:SpouseDetail;
  employeedata=[];
  isChecked:boolean = true;
  mindate:Date;
  maxdate:Date;
  emplytype:any=[];
  AddType:string="";
  dessignationdata:any=[];
  des:string="";
  joinmax:Date;
  joinmin:Date;
  SDobmin:Date;
  SDobmax:Date;
  namesy: string[] = [];
  names:string []=[]
  Marrige:string;
  param:any;
  filterdata:any;
  EmpData:any;
  imageSrc: any;
  UploadSrc:any;
  isVisible: boolean[] = [];
  isvisiblepersonal:Boolean[]=[];
  Filterarray=[]
  Filterarray1=[]
  SpouseTYpe:string="";
  SpouseTypeArray:any=[];
  DependentType:string="";
  DependentTypeArray:any=[]
  EmployeType:any;
  update_array:any;
  emp_code:any;
  selectedQualification: any = {};
  imageUrl: string | ArrayBuffer | null = null;
  Isupdate = false;
  constructor(private toast:ToastService,private router:Router,private route:ActivatedRoute,private datasharing:DataSharingService,private serivice2:DropdownService) { 
  
  }
  ischecked: boolean ;
  employeeCodeNumber = 1;
  ngOnInit(): void {
    
  this.createform();
  
 
  }

  createform(){
    this.getDependentType();
    this.GetSpouseType();
    this.model = new EmployeeMasterModel();
    this.model.EmployeeModel = new EmployeeModel();
    // this.model.qualification = new Qualificationmodel()
    this.model.QualificationDet = [];
    this.model.DependentDet = [];
    this.model.SpouseDet = new SpouseDetail();
    this.model.Uploads = new Employeeupload();
    this.model.PresonalDet = [];
    this.model.qualification=[];


    this.getEmployeeType()
    this.getDesignationType();
    this.SetDate()
    this.imageSrc =""
    this.isVisible = new Array(this.model.qualification.length).fill(true);
    this.isvisiblepersonal = new Array(this.model.PresonalDet.length).fill(true)
    this.param = this.route.snapshot.paramMap.get('id')
    console.log(this.param)
    
    if(this.param != "0" ){
      this.oneEdit();
     }
  }
 oneEdit(){

    
     this.Filterarray = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'))
     this.filterdata = this.Filterarray.filter(emp  => emp.EmployeeModel.EmployeeCode === this.param)
    
     console.log(this.filterdata)
     this.model = this.filterdata[0];
     this.model.EmployeeModel.EmployeeType
     this.model.EmployeeModel.Designation
    //  this.emplytype.push(this.model.EmployeeModel.EmployeeType);
    //  this.dessignationdata.push(this.model.EmployeeModel.Designation)
     this.model.EmployeeModel.Spouse= this.filterdata[0].EmployeeModel.Spouse
     this.isChecked = this.model.EmployeeModel.Marrige == 'Y'? true:false;
     if(this.model.EmployeeModel.Marrige == 'Y'){
        this.model.EmployeeModel.Spouse =this.filterdata[0].EmployeeModel.Spouse;
     }else{
      this.model.EmployeeModel.Spouse = null;
     }
     this.Isupdate = true;
     this.updatearray(this.emp_code)
    
    
  }

  
  getcode() {
    const emptype = this.model.EmployeeModel.EmployeeType[0];
  
    this.Filterarray1 = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'));
  
    // Filter existing employee codes based on the employee type
    const existingCodes = this.Filterarray1.filter(item => item.EmployeeModel.EmployeeCode.startsWith(emptype + '-'));
  
    if (existingCodes.length > 0) {
      // Find the highest existing number and increment it
      const existingNumbers = existingCodes.map(item => parseInt(item.EmployeeModel.EmployeeCode.split('-')[1]));
      const highestNumber = Math.max(...existingNumbers);
      const newNumber = highestNumber + 1;
  
      // Format the new number to be three digits with leading zeros
      const formattedNumber = newNumber.toString().padStart(3, '0');
  
      this.model.EmployeeModel.EmployeeCode = `${emptype}-${formattedNumber}`;
    } else {
      // No existing codes, start with -001
      this.model.EmployeeModel.EmployeeCode = `${emptype}-001`;
    }
  }
  

//  getcode(){
//   let emptype = this.model.EmployeeType[0];
//   const Code = emptype+'-001';
//   this.model.EmployeeCode = Code;
//  }
 formvalidation(){
  if(this.model.EmployeeModel.EmployeeCode == "" || this.model.EmployeeModel.EmployeeCode == null){
    this.toast.showwarning('Employee Code Cannot Be Blank','')
    return false
  }else if(this.model.EmployeeModel.EmployeeCode.trim()==""){
    this.model.EmployeeModel.EmployeeCode =""
    this.toast.showwarning('Employee Code  Cannot Be Empty Spaces','')
    return false
  }

  if(this.model.EmployeeModel.EmployeeName == "" || this.model.EmployeeModel.EmployeeName == null){
    this.toast.showwarning('Employee Name Cannot Be Blank','')
    return false
  }else if(this.model.EmployeeModel.EmployeeName.trim()==""){
    
    this.toast.showwarning('Employee Name  Cannot Be Empty Spaces','')
    return false
  }
  if(this.model.EmployeeModel.DateofBrith == null || this.model.EmployeeModel.DateofBrith == undefined){
    this.toast.showwarning('Date of Brith  Cannot Be Blank','')
    return false
  }
  if(this.model.EmployeeModel.DateofJoining == null || this.model.EmployeeModel.DateofJoining == undefined){
    this.toast.showwarning('Date of Joining  Cannot Be Blank','')
    return false
  }

  for(let i=0; i<this.model.qualification.length; i++){
    if(this.model.qualification[i].EduQualification == "" ||this.model.qualification[i].EduQualification == null  ){
      this.toast.showwarning('Qualification Cannot be Blank','')
      return false
    }
    for (let i = 0; i < this.model.qualification.length; i++) {
      for (let j = i + 1; j < this.model.qualification.length; j++) {
          if (this.model.qualification[i].EduQualification === this.model.qualification[j].EduQualification) {
              this.model.qualification[j].EduQualification = '';
              this.toast.showwarning('Qualification not to be same', 'Employee Master');
              return false;
          }
      }
  }
  }
  return true
 }
 onblurQualification(event,i) {
  
  }


 preparemodel(){
  let mod = new EmployeeMasterModel();
   mod.EmployeeModel  = this.model.EmployeeModel
  mod.PresonalDet=[];
  mod.qualification=[];
  mod.QualificationDet=[];
  mod.DependentDet=[]
  mod.Uploads = this.model.Uploads
  mod.SpouseDet = this.model.SpouseDet
  // mod.QualificationDet = this.model.QualificationDet;
  // mod.DependentDet = this.model.DependentDet;
  for(let i=0;i <this.model.PresonalDet.length;i++){
    let obj ={
      MarriageStatus:this.model.EmployeeModel.Marrige,
      Spouse:this.model.EmployeeModel.Spouse,
      SonDaughter:this.model.PresonalDet[i].SonDaughter,
    
    }
    mod.PresonalDet.push(obj)

  }
  for(let i=0;i<this.model.qualification.length;i++){
    let obj ={
      EduQualification:this.model.qualification[i].EduQualification
    }
    mod.qualification.push(obj)
  }
  for(let i=0;i<this.model.DependentDet.length;i++){
     let obj3 ={
      DependentName:this.model.PresonalDet[i].SonDaughter,
      DependentType:this.model.DependentDet[i].DependentType,
      DateofBrith:this.model.DependentDet[i].DateofBrith,
      Age:this.model.DependentDet[i].Age,
      ContactNo:this.model.DependentDet[i].ContactNo,
      EmailId:this.model.DependentDet[i].EmailId,
      DependentPhoto:this.model.DependentDet[i].DependentPhoto
     }
     mod.DependentDet.push(obj3)
  }
  for(let i=0;i < this.model.QualificationDet.length;i++){
    let obj2 = {
      QualificationType:this.model.QualificationDet[i].QualificationType,
      NameofIns:this.model.QualificationDet[i].NameofIns,
      YearPassing:this.model.QualificationDet[i].YearPassing,
      Grade:this.model.QualificationDet[i].Grade,
      SubjectOffered:this.model.QualificationDet[i].SubjectOffered,
      document:this.model.QualificationDet[i].document,
    }
    mod.QualificationDet.push(obj2)
  }

  return mod
 }


 

updatearray(emp_code){
  this.Filterarray1 = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'))
  const updatedarray = this.Filterarray1.filter(item => item.EmployeeModel.EmployeeCode != emp_code);
  localStorage.clear()
  for(let i=0;i<updatedarray.length;i++){
    this.datasharing.SetEmployeData(updatedarray[i])
  }
}


validateWedding(event) {
  const dobDate = new Date(this.model.EmployeeModel.DateofBrith);
  const sdobDate = new Date(this.model.SpouseDet.SpouseDOB);
  // const dowDate = new Date(this.model.SpouseDet.SpouseWeeding);

  const ageDob = new Date(dobDate.getFullYear() + 21, dobDate.getMonth(), dobDate.getDate());
  const ageSdob = new Date(sdobDate.getFullYear() + 18, sdobDate.getMonth(), sdobDate.getDate());

  if (event.target.value >= ageDob && event.target.value >= ageSdob) {
    // this.toast.showsucess('Wedding date is valid.', '');
  
  } else {
    this.toast.showwarning('Invalid wedding date. Check ages of groom and bride.', '');
    this.model.SpouseDet.SpouseWeeding = null;
  }
}



 onSubmit(){


  if(this.formvalidation()== true){
    if(this.Isupdate == true){
     const editmod = this.preparemodel()
     this.datasharing.SetEmployeData(editmod)
     this.router.navigate(['/EmployeeList'], { relativeTo: this.route });


    }else{
      const preparemodel = this.preparemodel();
      this.datasharing.SetEmployeData(preparemodel);
      this.router.navigate(['/EmployeeList'], { relativeTo: this.route });
    }
  }
 }





   EmployeeCode(event){

    this.Filterarray1 = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS'))
    const updatedarray = this.Filterarray1.filter(item => item.EmployeeCode == event.target.value);
    if(updatedarray){
      this.model.EmployeeModel.EmployeeCode ="";
      this.toast.showwarning('Employee Code Already Exist','')
    }

  } 
  EmployeeName(event){
    if(!event.target.validity.valid){
       this.model.EmployeeModel.EmployeeName ="";
       this.toast.showwarning("Should Not Allow Special Character","")
       this.toast.showwarning("minimum 3  and maximum 40 characters should be allowed","")
       
    }
  }
  validateDependentPhoneNumber(event,i){
    if(!event.target.validity.valid){
      this.model.DependentDet[i].ContactNo ="";
      this.toast.showwarning("Only Allow Numbers ","")
      
      
   }
  }
  validateDependentEmail(event,i){
    if(!event.target.validity.valid){
      this.model.DependentDet[i].EmailId ="";
      this.toast.showwarning("InValid Email Address","")
      
   }

  }
  toggleInput(event) {
   if(event.target.checked == true){
    this.model.EmployeeModel.isChecked == true;
    this.model.EmployeeModel.Marrige = "Y"
   }else{
    this.model.EmployeeModel.isChecked == false;
    this.model.EmployeeModel.Marrige = 'N';
    this.model.EmployeeModel.Spouse = "";
    this.model.SpouseDet = new SpouseDetail();
    this.model.Uploads = new Employeeupload();
   
   
   }
  }
  SetDate(){
    const today = new Date();
    this.mindate = new Date(
      today.getFullYear()-60,
      today.getMonth(),
      today.getDate()
    );
    this.maxdate = new Date(
      today.getFullYear()-22,
      today.getMonth(),
      today.getDate()
    )
    this.joinmax = today;
    this.joinmin = new Date(
      today.getFullYear(),
      today.getMonth()-1,
      today.getDate()
    )
   
    this.SDobmax = new Date(
      today.getFullYear()-18,
      today.getMonth(),
      today.getDate()
    )
  
  }
 AddChild(){

 let  isSonDaughter = true;
 for(let i=0; i<this.model.PresonalDet.length;i++){
    if(this.model.PresonalDet[i].SonDaughter == "" ||this.model.PresonalDet[i].SonDaughter == null){
      this.toast.showwarning('please Son/Daughter cannot be Blank','')
      isSonDaughter = false;
    }  

 }

  if(this.model.EmployeeModel.Spouse == "" || this.model.EmployeeModel.Spouse == null){
    this.toast.showwarning('Spouse Cannot Be Blank','')
  }
else if (isSonDaughter){
    let obj ={
      MarriageStatus:this.model.EmployeeModel.Marrige,
      Spouse:this.model.EmployeeModel.Spouse,
      SonDaughter:null,
    }
    this.model.PresonalDet.push(obj);

    let obj3 ={
      DependentName:null,
      DependentType:null,
      DateofBrith:null,
      Age:null,
      ContactNo:null,
      EmailId:null,
      DependentPhoto:null
    }
    this.model.DependentDet.push(obj3)
  }
 }



 AddQualification(){

  let isQualification = true

  for(let i =0;i<this.model.qualification.length;i++){
    if(this.model.qualification[i].EduQualification == "" || this.model.qualification[i].EduQualification == null){
      this.toast.showwarning('Qualication Cannot be Blank','')
      isQualification = false
    }
  }

   
   if(isQualification){
    let obj ={
      EduQualification:null
    }
    this.model.qualification.push(obj)

    let obj2 = {
      QualificationType:null,
      NameofIns:null,
      YearPassing:null,
      Grade:null,
      SubjectOffered:null,
      document:null,
    }
    this.model.QualificationDet.push(obj2)
   }

    
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

  onSubmitType() {
    if (this.formvalidationtype() === true) {
      const newType = { employeeType: this.AddType }; 

   
      this.serivice2.EmployeeTypeCreate(newType).subscribe(
          response => {
            console.log('Successfully created:', response);
            this.AddType = ""
            this.toast.showsucess('Sucessfully Created','')
            
          },
          error => {
            console.error('Error creating:', error);
          
          }
        );
    }
  }


 async getEmployeeType(){
  let response = await this.serivice2.GetEmployeeTypeCreate().catch(err=>{
    console.log(err)
  })
  this.emplytype  = response;

}
onEmployeeTypeBlur(event) {
  let response = this.emplytype.find(item => item.employeeType === event.target.value);
  if (response) {
    this.AddType = "";
    this.toast.showwarning('Already Exist Employee code', '');
  } else {
   
  }
}

validateSpouseType(){
  if(this.SpouseTYpe == "" || this.SpouseTYpe == null){
    this.toast.showwarning('Spouse Type Cannot be blank','')
    return false
  }
  if(this.SpouseTYpe.trim()==''){
    this.toast.showwarning('Spouse Type Cannot be Allow blank Spaces','')
    return false
  }
  return true
}

onBlurSpouseType(event){
  let response = this.SpouseTypeArray.find(item => item.SpouseType === event.target.value);
  if (response) {
    this.SpouseTYpe = "";
    this.toast.showwarning('Already Exist Spouse Type', '');
  } 
}

  OnsubmitSpouseType(){  

    if(this.validateSpouseType()== true){
      const SpouseType = { SpouseType: this.SpouseTYpe }; 

   
      this.serivice2.SpouseTypeCreate(SpouseType).subscribe(
          response => {
            console.log('Successfully created:', response);
            this.SpouseTYpe=""
            this.toast.showsucess('Sucessfully Created','')
            
          },
          error => {
            console.error('Error creating:', error);
          
          }
        );
     

    }


  }
  async GetSpouseType(){
    let response = await this.serivice2.GetSpouseTypeCreate().catch(err=>{
      console.log(err)
    })
    this.SpouseTypeArray = response;
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
  
    const DesType = { DesignationType: this.des }; 

   
    this.serivice2.DesignationTypeCreate(DesType)
      .subscribe(
        response => {
          console.log('Successfully created:', response);
          this.des = ""
          this.toast.showsucess('Sucessfully Created','')
    
        },
        error => {
          console.error('Error creating:', error);
        
        }
      );
  
   }
  }
  onEmployeeDesignationBlur(event) {
    let response = this.dessignationdata.find(item => item.DesignationType === event.target.value);
    if (response) {
      this.des = "";
      this.toast.showwarning('Already Exist Designation Type', '');
    }
  }

  async getDesignationType(){
    let response = await this.serivice2.GetDesignationTypeCreate().catch(err=>{
      console.log(err)
    })
    this.dessignationdata = response;
  }

  validateDependenttype(){
    if(this.DependentType == "" || this.DependentType == null){
      this.toast.showwarning('Dependent Type Cannot be Blank','')
      return false
    }
    if(this.DependentType.trim() == ""){
      this.toast.showwarning('Dependent Type Cannot be Allow Blank Spaces','')
      return false
    }
    return true
  }


  OnsubmitDependentType(){
    

    if(this.validateDesignation()== true){
      const DepType = { Dependentype: this.DependentType }; 

   
      this.serivice2.DependentTypeCreate(DepType)
        .subscribe(
          response => {
            console.log('Successfully created:', response);
            this.DependentType = ""
            this.toast.showsucess('Sucessfully Created','')
      
          },
          error => {
            console.error('Error creating:', error);
          
          }
        );
    }
  
   }
  
   async getDependentType(){
    let response = await this.serivice2.GetDependentTypeCreate().catch(err=>{
      console.log(err)
    })
    this.DependentTypeArray = response
   }
  onBlurDependentType(event){
    let response = this.DependentTypeArray.find(item => item.Dependentype === event.target.value);
    if (response) {
      this.DependentType = "";
      this.toast.showwarning('Already Exist Dependent Type', '');
    }
  }
  deleteRow(index: number) {
    console.log('Delete row clicked. Index:', index);
  
    if (this.model.qualification && index >= 0 && index < this.model.qualification.length) {
      this.isVisible[index] = false;
  
      const deletedQualification = this.model.qualification.splice(index, 1)[0];
      console.log('Deleted qualification:', deletedQualification);
  
    }
  }
  
  deletePersRow(index: number) {
    console.log('Delete row clicked. Index:', index);
  
    if (this.model.PresonalDet && index >= 0 && index < this.model.PresonalDet.length) {
      this.isVisible[index] = false;
  
      const deletedQualification = this.model.PresonalDet.splice(index, 1)[0];
      console.log('Deleted qualification:', deletedQualification);
  
      // Note: You can perform any additional cleanup here if needed
    }
  }

  onClear(): void {
    window.location.reload();
  
    
    
  }

  onCleardata(){
    this.model.EmployeeModel = new EmployeeModel()
    this.model.Uploads = new Employeeupload()
    this.model.PresonalDet=[]
    this.model.qualification=[]
    const PresonalDet = new personaldetmodel()
    this.model.PresonalDet.push(PresonalDet)
    const quaModel = new Qualificationmodel()
    this.model.qualification.push(quaModel)
   
  }

 
  displayImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.model.Uploads.Photo = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
  displaySpouseImage(event){
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.model.SpouseDet.SpouseImage = e.target?.result;
      };
      reader.readAsDataURL(file);
    }

  }
  displayDependentImage(event: any, i: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.model.DependentDet[i].DependentPhoto = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  displayDocument(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadSrc = event.target.result as string;  
        this.model.Uploads.MarriageCertificate = uploadSrc;
       
        
      
      };
      reader.readAsDataURL(file);
    }
  }

  validatephone(event){
    if(!event.target.validity.valid){
      this.model.SpouseDet.SpouseContact ="";
      this.toast.showwarning('Only use Numbers','')
      
   }
  }
  validatemail(event){
    if(!event.target.validity.valid){
      this.model.SpouseDet.SpouseEmail ="";
      this.toast.showwarning('Invalid Email','')
      
   }
  }

  displayQualiDocument(event: any, i: number): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadSrc = event.target.result as string;
        this.model.QualificationDet[i].document = uploadSrc;
      };
      reader.readAsDataURL(file);
    }
  }
  onback(){
    this.router.navigate(['/EmployeeList'],{relativeTo:this.route});
  }
  OnClearSpouse(){
   this.model.SpouseDet.SpouseName = null;
   this.model.SpouseDet.SpouseType = null;
   this.model.SpouseDet.SpouseEmail = null;
   this.model.SpouseDet.SpouseDOB=null;
   this.model.SpouseDet.SpouseWeeding = null;
   this.model.SpouseDet.SpouseContact= null;
   this.model.SpouseDet.SpouseImage = null;
  }
  OnClearDependt(i){
    this.model.DependentDet[i].DependentName = null;
    this.model.DependentDet[i].DependentType = null;
    this.model.DependentDet[i].DependentPhoto = null;
    this.model.DependentDet[i].DateofBrith = null;
    this.model.DependentDet[i].Age = null;
    this.model.DependentDet[i].ContactNo = null;
    this.model.DependentDet[i].EmailId = null;

  }
  onClearQualification(i){
    this.model.QualificationDet[i].QualificationType = null;
    this.model.QualificationDet[i].NameofIns =null;
    this.model.QualificationDet[i].Grade=null;
    this.model.QualificationDet[i].document=null;
    this.model.QualificationDet[i].YearPassing=null;
    this.model.QualificationDet[i].SubjectOffered=null;
  }
}