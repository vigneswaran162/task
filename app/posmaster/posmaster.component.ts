import { Component,OnInit ,Inject} from '@angular/core';
import { ItemmasterService } from '../service/itemmaster.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../service/toast.service';
import { posmodel } from '../models/itemmastermodel';



@Component({
  selector: 'app-posmaster',
  templateUrl: './posmaster.component.html',
  styleUrls: ['./posmaster.component.scss']
})
export class PosmasterComponent implements OnInit {

  
  
  model:posmodel; 
  isupdate = false;
  constructor(private toast:ToastService,private service:ItemmasterService, private dialogRef:MatDialogRef<PosmasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
      dialogRef.disableClose = true; 
    }
  ngOnInit(): void {
    this.model = new posmodel();
  }

  formvalidation(){
    if(this.model.posdesc == '' || this.model.posdesc == null){
      this.toast.showerror('UOM Description cannot be blank','')
      return false
    }else if(this.model.posdesc.trim()=="") {
      this.toast.showerror("UOM Description cannot be empty spaces",'');
      return false;
    } 
    if(this.model.poscode == '' || this.model.poscode == null){
      this.toast.showerror('UOM Code cannot be blank','')
      return false
    }else if(this.model.poscode.trim()=="") {
      this.toast.showerror("UOM Description cannot be empty spaces",'');
      return false;
    } 
    return true
  }

  preparemodel(){
    let mod = new posmodel();
    mod.poscode = this.model.poscode;
    mod.posdesc = this.model.posdesc;
    mod.Void = "N";
    return mod;
  }

  // onSubmit(){
  //   if(this.formvalidation()== true){
  //     if(this.isupdate == false){
  //       const addpositem = this.preparemodel()
    
  //       this.service.createposmodule(addpositem).then(response=>{
       
  //         if (response.Boolval == true) {
  //           this.toast.showsucess('Record Added Successfully','')
  //           this.dialogRef.close();
  //           this.model = new posmodel()
  
    
  //         } else {
  //           this.toast.showerror(response.returnerror, '');
  //         }
        
  //       })
  //     }
  //   }
  // }

    async onSubmit(){
    if(this.formvalidation()==true){
      if(this.isupdate==false){
      const addpositem = this.preparemodel()
        let response = await this.service.createposmodule(addpositem).catch(err=>{
           console.log(err)
        })
        if (response.Boolval == true) {
          this.toast.showsucess('Record Added Successfully','')
          this.dialogRef.close();
         this.model = new posmodel()

  
        }
        else {
            this.toast.showerror(response.returnerror, '');
        }

      }
    }
  }


}
