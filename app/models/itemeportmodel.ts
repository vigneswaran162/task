export class itemreportmodel {
    itemlist:itemDetails[];
    FromDate:Date;
    ToDate:Date;
    createdBy:String;
    Type:string;
}
export class itemDetails{
    itemdescription:String;
    isChecked:boolean
}