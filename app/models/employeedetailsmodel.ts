import { DependentModel } from "./DependentModel";


export class EmployeeMasterModel{
    EmployeeModel:EmployeeModel;
    SpouseDet:SpouseDetail;
    PresonalDet:personaldetmodel[];
    qualification:Qualificationmodel[];
    QualificationDet:QualifictionDetModel[];
    DependentDet:DependentModel[];
    Uploads:Employeeupload;
}

export class EmployeeModel {
    EmployeeCode:string;
    EmployeeType:string;
    EmployeeName:string;
    DateofBrith:Date;
    Designation:string;
    DateofJoining:Date;
    Marrige:string;
    isChecked:boolean;
    Spouse:string;

  
  
    Void:string;
}

export class personaldetmodel{
    MarriageStatus:string;
    Spouse:string;
    SonDaughter:string;
}
export class Qualificationmodel{
    EduQualification:string
}

export class SpouseDetail{
    SpouseName:string;
    SpouseType:string;
    SpouseWeeding:Date;
    SpouseDOB:Date;
    SpouseContact:string;
    SpouseEmail:string;
    SpouseImage:any;
}
export class QualifictionDetModel{
    QualificationType:string;
    NameofIns:string;
    YearPassing:string;
    Grade:string;
    SubjectOffered:string;
    document:string;
}
export class Employeeupload{
    Photo:any;
    MarriageCertificate:any;
   
}