export class itemmastermodel{
    
    itemdescription:string;
    uom:string;
    itemtax:string;
    openitem:string;
    creationdate:Date;
    tax:string;
    Void: string;
    createdAt: string;
    updatedAt: string;
    voidedAt: string;
    ItemMasterRatemodelt: itemmasterratemodel[];

    
}
export class itemmasterratemodel{
    itemdesc:string;
    Rate:number;
    posdesc:string;
    // tax:string;
    isChecked:boolean;
    disablerate:boolean;
   
    // Void: string;
    // createdAt: string;
    // updatedAt: string;

}
export class posmodel{
    
   
    poscode:string;
    posdesc:string;
    posrate:number;
   
   
    Void: string;
    createdAt: string;
    updatedAt: string;
    voidedAt: string;

}
export class feedtaxmodel{
    feedtax:string;
}