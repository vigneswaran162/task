import { Component , OnInit,Inject} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { uommastermodel } from '../models/uommastermodel';
import { ToastService } from '../service/toast.service';
import { ItemmasterService } from '../service/itemmaster.service';

@Component({
  selector: 'app-uommaster',
  templateUrl: './uommaster.component.html',
  styleUrls: ['./uommaster.component.scss']
})
export class UommasterComponent implements OnInit {

  model:uommastermodel;
  isupdate = false;

  constructor(private toast:ToastService,private service:ItemmasterService , 
    private dialogRef:MatDialogRef<UommasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
      dialogRef.disableClose = true; 
    }
  ngOnInit(): void {
    
   this.model = new uommastermodel();

  }
  preparemodel(){
    let mod = new uommastermodel();
    mod.uomdesc = this.model.uomdesc;
    mod.uomcode = this.model.uomcode;
    mod.Void = "N";
    return mod;
  }
  formvalidation(){
    if(this.model.uomdesc == '' || this.model.uomdesc == null){
      this.toast.showerror('UOM Description cannot be blank','')
      return false
    }else if(this.model.uomdesc.trim()=="") {
      this.toast.showerror("UOM Description cannot be empty spaces",'');
      return false;
    } 
    if(this.model.uomcode == '' || this.model.uomcode == null){
      this.toast.showerror('UOM Code cannot be blank','')
      return false
    }else if(this.model.uomcode.trim()=="") {
      this.toast.showerror("UOM Description cannot be empty spaces",'');
      return false;
    } 
    return true
  }

  async onSubmit(){
    if(this.formvalidation()==true){
      if(this.isupdate==false){
        const adduomitem = this.preparemodel()
        let response = await this.service.getadduomitem(adduomitem).catch(err=>{
           console.log(err)
        })
        if (response.Boolval == true) {
          this.toast.showsucess('Record Added Successfully','')
          this.dialogRef.close();
          this.model = new uommastermodel()

  
        }
        else {
            this.toast.showerror(response.returnerror, '');
        }

      }
    }
  }

}
