import { Component, OnInit } from '@angular/core';
import { configuration } from '../config/config';
import { itemreportmodel } from '../models/itemeportmodel';
import { ItemmasterService } from '../service/itemmaster.service';
import { ToastService } from '../service/toast.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-item-master-report',
  templateUrl: './item-master-report.component.html',
  styleUrls: ['./item-master-report.component.scss']
})
export class ItemMasterReportComponent implements OnInit {
  currentDate: Date;
  MaxDate: any;
  model:itemreportmodel;
  itemlist:[];
  userSelectAll = false;
  isUpdate = false;
  constructor( public config: configuration,private service:ItemmasterService,private toast:ToastService) { }

  ngOnInit(): void {
  
      this.createform();
      this.setDate()
  }


   createform(){
    this.model = new itemreportmodel();
    this.model.itemlist = this.itemlist;
    this.userSelectAll = false;
  
    
    this.getreportlist();
    for (let i = 0; i < this.model.itemlist.length; i++) {
      this.model.itemlist[i].isChecked = false;
    }
   }




  selectAll(Type) {
    if (Type == 'itemdesc') {
      for (let i = 0; i < this.model.itemlist.length; i++) {
        this.model.itemlist[i].isChecked = this.userSelectAll ;
      }
    } 
  }
  setDate() {
    this.currentDate = new Date();
    let MaxDate = JSON.parse(JSON.stringify(this.config.gGetDateyyyymmdd(this.currentDate)));
    this.model.FromDate = MaxDate;
    this.model.ToDate = MaxDate;
  }
 
 
  async getreportlist(){
    let response = await this.service.getall().catch(err=>{
      console.log(err)
    })
    this.itemlist = response;
    this.model.itemlist = response;
  }

  async onsubmit(_viewtype){
    if (_viewtype == "report") {
      let url = "http://localhost:65061/ItemasterReport/GetReportData?createdBy=bb&&Type=AA&FromDate=09-May-2022&ToDate=03-Aug-2022" ;
      window.open(url, "_blank");
      }
    else {
     
      return;
    }
  }


  selectedOption: string = '';
  fieldValue: string = '';

  showField(option: string): void {
    this.selectedOption = option;
    this.fieldValue = ''; // Reset field value when switching options
  }

formvalidation(){
  let Usercount = 0;
  for (let i = 0; i < this.model.itemlist.length; i++) {
    if (this.model.itemlist[i].isChecked == true) {
      Usercount += 1;
    }
  }
  if (Usercount <= 0) {
    this.toast.showerror('Atleast 1 user should be selected','');
    return false;
  }
  if(this.model.FromDate == null){
    this.toast.showerror('From Date cannot be blank','')
    return false
  }
  if(this.model.ToDate == null){
     this.toast.showerror('To Date cannot be blank','')
    return false
  }
  if(this.model.Type == null){
    this.toast.showerror('Order Wise  cannot be blank','')
   return false
 }
  return true
}

 async onSubmit(){
  if(this.formvalidation() == true){
    const _model = new itemreportmodel();
    _model.itemlist = this.itemlist;
    _model.FromDate = this.model.FromDate;
    _model.ToDate = this.model.ToDate;
    _model.Type = this.model.Type;
    _model.createdBy = 'vignesh';
    let response = await this.service.GetReport(_model).catch( err=>{
      console.log(err)
    })
    if(response != null){
      let fdate = this.config.gGetDateyyyymmdd(this.config.gGetDate4Cal(formatDate(this.model.FromDate, "yyyy-MM-dd", this.config.localtimezone)));
      let tdate = this.config.gGetDateyyyymmdd(this.config.gGetDate4Cal(formatDate(this.model.ToDate, "yyyy-MM-dd", this.config.localtimezone)));
      // let url = "http://localhost:65061/ItemasterReport/GetReportData?createdBy=+_model.createdBy+&&Type=AA&FromDate=+fdate+&ToDate=+tdate+"
      let url = this.config.Reporturl +"ItemasterReport/GetReportData?createdBy="+_model.createdBy+"&Type="+_model.Type+"&FromDate="+fdate+"&ToDate="+tdate;
       window.open(url, "_blank");  
    }
  }
 }

}

// async oubmit(){
//   if(this.formvalidatation() == true){
//     const _model = new ItemReportModel();
//     _model.ItemDetails = this._ItemDetails;
//     _model.FromDate = this._config.gGetDateyyyymmdd(this.model.FromDate);
//     _model.ToDate = this._config.gGetDateyyyymmdd(this.model.ToDate);
//     _model.OpsType = 'P';
//     _model.createdBy = 'Ranjith'
//     let resp = await this.service.CRUD(_model)
//     let fdate = this._config.gGetDateyyyymmdd(this._config.gGetDate4Cal(formatDate(this.model.FromDate, "yyyy-MM-dd", this._config.localtimezone)));
//     let tdate = this._config.gGetDateyyyymmdd(this._config.gGetDate4Cal(formatDate(this.model.ToDate, "yyyy-MM-dd", this._config.localtimezone)));
//   // let url = this._config.ReportUrl + "ItemMaster/GetReportData?createdBy="+this.model.createdBy+"&FromDate="+this._config.gGetDateyyyymmdd(this.model.FromDate)+"&ToDate="+this._config.gGetDateyyyymmdd(this.model.ToDate);
//     let url = this._config.ReportUrl + "ItemMaster/GetReportData?createdBy="+_model.createdBy+"&Type="+this.Wise+"&FromDate="+fdate+"&ToDate="+tdate;
//     window.open(url, "_blank");
//   }
