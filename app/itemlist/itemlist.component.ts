import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemmasterService } from '../service/itemmaster.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router ,ActivatedRoute} from '@angular/router';
import { configuration } from '../config/config';
import { MultiArrModel } from '../models/mutliarrmodel';
import { itemmastermodel } from '../models/itemmastermodel';
import { ToastService } from '../service/toast.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {
  
  displayedColumns = ['itemdescription', 'uomcode','Tax', 'creationdate', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
   
  dataSource: any;
  dataSource2: any;
  loaddata: any;
  loaddata2: any;
  _dataListLength: any;
  dataload: any;
  MultiArr: MultiArrModel[];
  model:itemmastermodel;
  isupdate = false;
  IsVoid = false;
  void:any
  constructor(private service: ItemmasterService,private router:Router,private route:ActivatedRoute,private _config:configuration,private toast:ToastService) { 
    this.MultiArr = [];
  }

  ngOnInit(): void {
    this.loadlist();
    this.model = new itemmastermodel();
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
   this.dataload = response.data;
   
    // const loaddata2 = response.data2;
    // this.dataload = loaddata2.map((item1: any) => ({
    //   ...item1, ...loaddata.find((item2: { itemdescription: any; }) => item2.itemdescription === item1.itemdesc)
    // }));
    console.log(this.dataload);
    this.dataSource = new MatTableDataSource(this.dataload.reverse());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._dataListLength = response.length;
    this.dataSource.paginator.length = response.length;

  }





  onReport(){
    this.router.navigate(['/Report'],{relativeTo:this.route});
  }
  onCreate(): void {
    this.router.navigate(['/itemedit', '0'],{relativeTo:this.route});
  }
  onedit(data): void {
    this.router.navigate(['/itemedit', data.itemdescription], { relativeTo: this.route });
  }
  async onSubmit(_viewtype){
    if (_viewtype == "report") {
      let url = "http://localhost:65061/ItemasterReport/GetReportData?createdBy==bb&&Type=AA&FromDate=09-May-2022&ToDate=03-Aug-2022" ;
      window.open(url, "_blank");
      }
    else {
     
      return;
    }
  }

  async AllExportExcel(){
    let response = await this.service.getalldata().catch(err=>{
      console.log(err)
    });
    console.log(response)
    if (response != undefined) {
     
      this.MultiArr = [];

      let obj = {
        data : JSON.parse(JSON.stringify(response.data.map(({itemdescription,uom,itemtax,creationdate,Void }) => ({itemdescription,uom,itemtax,creationdate,Void })))),
        sheet:  "sheet1"
      }
      let obj2 = {
        data : JSON.parse(JSON.stringify(response.data2.map(({ itemdesc,posdesc,Rate }) => ({itemdesc,posdesc,Rate  })))),
        sheet: "sheet2"
      }
      this.MultiArr.push(obj);
      this.MultiArr.push(obj2);

    
      this._config.exportMultiArrayToExcel(this.MultiArr, "Item Master");

    }
   
    return;
  }

  async onVoid(data) {
    const editedMod = new itemmastermodel
    editedMod.itemdescription = data.itemdescription ;
    editedMod.Void ='Y'
    let response = await this.service.voiditem(editedMod).catch(err=>{
      console.log(err)
    })
    if (response != null){
      this.toast.showsucess('voided','')
      this.refresh()
    }
  }

  async onunVoid(data) {
   
    const editedMod = new itemmastermodel
    editedMod.itemdescription = data.itemdescription ;
    editedMod.Void ='N'
    let response = await this.service.voiditem(editedMod).catch(err=>{
      console.log(err)
    })
    if (response != null){
      this.toast.showsucess('unvoided','')
      this.refresh()
    }
  }
  refresh(): void {
    window.location.reload();
  }
}

