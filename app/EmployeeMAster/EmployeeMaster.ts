export class EmployeeModel {
    EmployeeCode:string;
    EmployeeType:string;
    EmployeeName:string;
    DateofBrith:Date;
    Designation:string;
    DateofJoining:Date;
    Marrige:string;
    isChecked:boolean;
    PresonalDet:personaldetmodel[];
    qualification:Qualificationmodel[];
    Spouse:string;
    EmployeeUpload:FileUploadModel[];
 
}

export class personaldetmodel{
    MarriageStatus:string;
    Spouse:string;
    SonDaughter:string;
  
    

}
export class Qualificationmodel{
    EduQualification:string
}


export class FileUploadModel{
   FileUpload:any;
}

