import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ToastService } from '../service/toast.service';
import { ItemmasterService } from '../service/itemmaster.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UommasterComponent } from '../uommaster/uommaster.component';
import { PosmasterComponent } from '../posmaster/posmaster.component';
import { __param } from 'tslib';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { itemmastermodel, itemmasterratemodel, posmodel, feedtaxmodel } from '../models/itemmastermodel';
import { configuration } from '../config/config';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { transition } from '@angular/animations';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-itemaster',
  templateUrl: './itemaster.component.html',
  styleUrls: ['./itemaster.component.scss']
})
export class ItemasterComponent implements OnInit {
  [x: string]: any;
  displayedColumns = ['itemdescription', 'uomcode', 'uom', 'Rate','Tax', 'creationdate', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
   

  taxData: any[] = [];
  model: itemmastermodel;
  tmodel: feedtaxmodel;
  formname: string = 'Item Master';
  itemlist: any;
  isupdate = false;
  IsVoid = false;
  item: any;
  showoff = true;
  uomdesc: any;
  currentDate: Date;
  MaxDate: any;
  posmos: any = [];
  posmosdesc: any;
  isChecked: boolean = true;
  _itemmaster: itemmasterratemodel[];
  _itemModel: itemmasterratemodel;
  dataSource: any;
  dataSource2: any;
  loaddata: any;
  loaddata2: any;
  _dataListLength: any;
  dataload: any;
  isEditing: boolean = false;
  feedtax: string = '';
  posmodel: posmodel;
  posmod: any = [];
  respdata:any=[];
  param:any;
  taxd:any;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  cleardata(i: any) {
    this.posmos[i].Rate = null;
    this.model.ItemMasterRatemodelt[i].Rate = 0;
    this.model.ItemMasterRatemodelt[i].isChecked = false;
   
  }
  //  taxperc: string[];
  //  taxperc = [ '5%','12%','18%'];
  constructor(private toast: ToastService, private service: ItemmasterService,
    public dialog: MatDialog, public config: configuration,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {




    this.tmodel = new feedtaxmodel();
    this.model = new itemmastermodel();
    this._Model = new itemmasterratemodel();
    this.posmodel = new posmodel();

    this.getdata();
    this.isupdate = false;
    this.IsVoid = false;
    this.getuomdesc();

    this.setDate();
    this.getposmodule();
    this.loadlist();
    this.alldata();
    this.getposgrid();
   
    this.param = this.route.snapshot.paramMap.get('itemdescription')

   if(this.param != "0" ){
    this.isEditMode = !this.isEditMode;
      this.oneedit(this.param)
   }
   
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
  // async edit(row: any) {
  //   let item = row.itemdescription;
  //   let response = await this.service.GetById(item).catch((err: { message: any; }) => {

  //     this.toast.showerror(err.message, this.formname);
  //     // this.model = new itemmastermodel();
  //   });
  //   this.model = response.data;
  //   // this.model.ItemMasterRatemodelt = response.data2;
  //   this.respdata = response.data2
  //   this.isupdate = true;
  //   this.getposgrid();
    
  //   if (this.model.Void != null) {
  //     this.model.Void == 'N' ? this.IsVoid = false : this.IsVoid = true;
  //   }
  // }
  async oneedit(param:any) {
    let item = param
    let response = await this.service.GetById(item).catch((err: { message: any; }) => {

      this.toast.showerror(err.message, this.formname);
    
    });
    this.model = response.data;
    this.taxd = response.data.itemtax
    this.respdata = response.data2
    this.taxData.push(this.taxd)
    this.isupdate = true;
    this.getposgrid();
    
    if (this.model.Void != null) {
      this.model.Void == 'N' ? this.IsVoid = false : this.IsVoid = true;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async loadlist() {

    let response = await this.service.getalldata().catch((err: any) => {

      console.log(err)
    })
    const loaddata = response.data;
    const loaddata2 = response.data2;
    this.dataload = loaddata2.map((item1: any) => ({
      ...item1, ...loaddata.find((item2: { itemdescription: any; }) => item2.itemdescription === item1.itemdesc)
    }));
    console.log(this.dataload);
    this.dataSource = new MatTableDataSource(this.dataload.reverse());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._dataListLength = response.length;
    this.dataSource.paginator.length = response.length;

  }

  async alldata() {
    let response = await this.service.getalldata().catch((err: { message: any; }) => {
      this.toast.showerror(err.message, this.formname);
    });
    console.log(response)
  }

  setDate() {
    this.currentDate = new Date();
    this.MaxDate = JSON.parse(JSON.stringify(this.config.gGetDateyyyymmdd(this.currentDate)));
    this.model.creationdate = this.MaxDate;
  }

  formvalidation() {
    if (this.model.itemdescription == "" || this.model.itemdescription == null) {
      this.toast.showerror('Item Description cannot be blank', this.formname)
      return false
    } else if (this.model.itemdescription.trim() == "") {
      this.toast.showerror("Item Description cannot be empty spaces", this.formname);
      return false;
    }
    if (this.model.uom == "" || this.model.uom == null) {
      this.toast.showerror('UOM cannot be blank', this.formname)
      return false
    }
    if( this.model.itemtax == undefined || this.model.itemtax == null){
      this.toast.showerror('Item Tax cannot be blank',this.formname)
      return false
    }
    if (this.model.openitem === undefined || this.model.openitem == null) {
      this.toast.showerror('Open Item cannot be blank', this.formname)
      return false
    }
    if (this.model.creationdate == undefined || this.model.creationdate == null) {
      this.toast.showerror('Creation Date cannot be blank', this.formname)
      return false
    }
    let filterpos = this.model.ItemMasterRatemodelt.filter((e: any) => e.isChecked == true)
    console.log(filterpos)
    if (filterpos.length == 0) {
      this.toast.showerror('Please Select Any One POS', '')
      return false
    }

    for (let i = 0; i < this.model.ItemMasterRatemodelt.length; i++) {
      
      if (this.model.ItemMasterRatemodelt[i].isChecked == true) {
        if ( this.model.ItemMasterRatemodelt[i].Rate == 0 || this.model.ItemMasterRatemodelt[i].Rate == undefined) {
          this.toast.showerror('Rate Cannot Be Blank', '')
          return false

        }
   
       
      }
      
    }



    return true
  }

  preparemodel() {
    let mod = new itemmastermodel();
    mod.itemdescription = this.model.itemdescription;
    mod.uom = this.model.uom;
    mod.itemtax = this.model.itemtax;
    mod.openitem = this.model.openitem;
    mod.creationdate = this.model.creationdate;
 
    mod.Void = "N";
    mod.ItemMasterRatemodelt = [];
   for(let i =0; i< this.model.ItemMasterRatemodelt.length;i++){
    if(this.model.ItemMasterRatemodelt[i].isChecked == true){
      let obj ={
        itemdesc: this.model.itemdescription,
        posdesc:this.model.ItemMasterRatemodelt[i].posdesc,
        isChecked:this.model.ItemMasterRatemodelt[i].isChecked,
        Rate:this.model.ItemMasterRatemodelt[i].Rate,
        disablerate:true,
      
  
      }
      mod.ItemMasterRatemodelt.push(obj)
    }
   }

    return mod;

  }


  async onSelectcopy(event: any) {
    let item = event.value;
    let response = await this.service.GetById(item).catch((err: { message: any; }) => {

      this.toast.showerror(err.message, this.formname);
      this.model = new itemmastermodel();
    });
    if (this.isupdate = true) {
      this.model = response.data;
      this.model.ItemMasterRatemodelt = response.data2;
  
      if (this.model.Void != null) {
        this.model.Void == 'N' ? this.IsVoid = false : this.IsVoid = true;
      }
    }

  }






  onbluritemtax(event: any) {
    if (event.target.value >= 100 || event.target.value < 0) {
      this.model.itemtax = '';
    }

  }



  async getdata() {
    let response = await this.service.getall().catch((err: { message: any; }) => {
      this.toast.showerror(err.message, this.formname);
    });

    this.itemlist = response.map((e: { itemdescription: any }) => e.itemdescription)
  }

  async getuomdesc() {
    let response = await this.service.getuomdesc().catch((err: { message: any; }) => {
      this.toast.showerror(err.message, this.formname);
    });
    this.uomdesc = response;

    if (this.uomdesc.length == 1) {
      this.model.uom = response[0].uomcode;
    }
    else {
      this.uomdesc = response;
    }
  }





  async getposmodule() {

    let response = await this.service.getaddposmodule().catch((err: { message: any; }) => {
      this.toast.showerror(err.message, this.formname);

    });
    this.posmos = response;
    this.getposgrid()


  }

  async getposgrid(){
    this.model.ItemMasterRatemodelt=[];
    for(let i =0; i<this.posmos.length; i++){
      this._itemModel = new itemmasterratemodel();
      this._itemModel.itemdesc=this.model.itemdescription;
      this._itemModel.posdesc=this.posmos[i].posdesc;
      this._itemModel.isChecked=false;
      this._itemModel.Rate=0;
      this._itemModel.disablerate=false;
      this.model.ItemMasterRatemodelt.push(this._itemModel)
      
    for (let i = 0; i < this.model.ItemMasterRatemodelt.length; i++) {
      for (let j = 0; j < this.respdata.length; j++) {
        if(this.posmos[i].posdesc == this.respdata[j].posdesc){
          this.model.ItemMasterRatemodelt[i].posdesc =this.respdata[j].posdesc;
          this.model.ItemMasterRatemodelt[i].isChecked =true
          this.model.ItemMasterRatemodelt[i].Rate =this.respdata[j].Rate;
          this.model.ItemMasterRatemodelt[i].disablerate =false;
        }
        
      }
      this.isEditMode = !this.isEditMode;
    }
    }

  }

  isCheckedvoid(event: MatCheckboxChange, i: any) {
    console.log(event)
    if (event.checked) {
      // if (this.model.ItemMasterRatemodelt[i].isChecked == true) {
      //   this.model.ItemMasterRatemodelt[i].disablerate=true;
      // }
      // else {
      //   this.model.ItemMasterRatemodelt[i].disablerate=false;
      // }
    }
  }

  //   isCheckedvoid(event: MatCheckboxChange, i: any) {
  
  //     if (this.model.ItemMasterRatemodelt[i].isChecked == true) {
  //       this.model.ItemMasterRatemodelt[i].disablerate=false;
  //     }
  //     else {
  //       this.model.ItemMasterRatemodelt[i].disablerate= true;
  //     }
    
  // }




  openDialog() {
    if (this.model.uom = "ADD UOM") {
      const dialogRef = this.dialog.open(UommasterComponent, { disableClose: true });

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          this.getuomdesc();
          this.model.uom = ''
        }
      })
    }
  }
  openDialogpos() {
    const dialogRef = this.dialog.open(PosmasterComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getposmodule()
      }
    })
  }

  async onSubmit() {
    if (this.formvalidation() == true) {
      this.model.Void = "N"
      this.IsVoid = false
      if (this.isupdate == true) {

        const PrepareMode = this.preparemodel();
        let response = this.service.updatedata(PrepareMode).catch((err: any) => {
          console.log(err)
        });
        this.model = new itemmastermodel();
        this.toast.showsucess('Record Update Successfully', this.formname)
        this.refresh();
        // return response;

      }
      else {

        if (this.formvalidation() == true) {
          if (this.isupdate == false) {
            const PrepareMode = this.preparemodel();
            let response = await this.service.createdata(PrepareMode).catch((err: any) => {
              console.log(err)
            })
            if (response.Boolval == true) {
              this.model = new itemmastermodel();
              this.toast.showsucess('Record Saved Successfully', this.formname)
              this.refresh();

            }
            else {
              this.toast.showerror(response.returnerror, '');
            }

          }
        }


      }
    }

  }
  // async onVoid() {
  //   if (this.formvalidation() == true) {
  //     const editedMod = new itemmastermodel();
  //     editedMod.Void = this.model.Void == 'N' ? 'Y' : 'N';
  //     editedMod.itemdescription = this.model.itemdescription;
  //     let response = await this.service.voiditem(editedMod).catch((err: any) => {
  //       console.error(err)
  //       this.toast.showerror(err, "Item Master")
  //       return false;
  //     })
  //     if (response != null) {
  //       if (response == "true" || this.IsVoid == false) {
  //         this.toast.showsucess("Item Voided Successfully.", this.formname)
  //         this.model = new itemmastermodel()
  //         // this.refresh();
  //       } else {
  //         this.toast.showsucess("Item UnVoided Successfully.", this.formname)
  //         this.model = new itemmastermodel()
  //         // this.refresh();
  //       }
  //     }-


  //   }
  // }
  onClear() {

    this.refresh();

  }

  onBack(){
    this.router.navigate([''],{relativeTo:this.route});
  } 
  refresh(): void {
    window.location.reload();
  }
  // let tax = this.taxData.includes(this.tmodel.feedtax)
  formvalidtax() {
    if (this.feedtax == '' || this.feedtax == null) {
      this.toast.showerror('Tax Precentage cannot be blank', this.formname)
      return false
    } else if (this.feedtax.trim() == '') {
      this.toast.showerror("Tax Precentage cannot be empty spaces", '');
      return false;
    }
    if (this.taxData.includes(this.feedtax)) {

      this.toast.showerror("Tax Percentage Already Exist", '');
      return false;
    }


    return true
  }
  taxdetails:any;
  onSubmittax() {
    if (this.formvalidtax() == true) {

      this.taxData.push(this.feedtax);
      this.feedtax = '';
      this.toast.showsucess('sucessfully created', '')
      // if(this.isupdate == true){
      //   this.taxData.push(this.taxd)
      //   this.feedtax = '';
      //   this.toast.showsucess('sucessfully created', '')

      // }
    
      
     
    }
  }

  isInputsEnabled: boolean = false;


  enableInputs() {

    this.isInputsEnabled = !!this.feedtax;



  }


  handleClickOnDisabledField(fieldName: string) {
    if (!this.isInputsEnabled) {
      this.toast.showwarning('Tax Details Should Not Be Empty Please add Feed Tax', '')
    }
  }

}
