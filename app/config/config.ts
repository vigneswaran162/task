import { formatDate } from '@angular/common';
import { Component, OnInit, Injectable } from '@angular/core';



import * as XLSX from 'xlsx';


@Injectable({ providedIn: 'root' })

export class configuration{
    public Reporturl ="http://localhost:65061/";
    public localtimezone = "en-IN";
    public ReportBaseURL = 'https://localhost:44361/';
    public defaultimage =
    'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg';
    gGetDateyyyymmdd(par: any, divider: any = '-'): any {
        if (par == undefined) {
          return formatDate(new Date(), 'yyyy-MM-dd', this.localtimezone);
        }
        if (typeof (par) == 'object') {
          if (par.year != undefined && par.year != null && par != "") {
            return formatDate(
              par.year + divider + par.month + divider + par.day,
              'yyyy' + divider + 'MM' + divider + 'dd'
              , this.localtimezone
            );
          } else {
            return formatDate(par.toString(), 'yyyy-MM-dd', this.localtimezone);
          }
        } else {
          return formatDate(par, 'yyyy-MM-dd', this.localtimezone).toString();
        }
    
      }

      exportArrayToExcel(data: any[], filename: string, sheetName: string) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, worksheet, sheetName);
    
        /* save to file */
        XLSX.writeFile(wb, filename + '.xlsx');
    
      }
      exportMultiArrayToExcel(MultiArr: any[], filename: string,) {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        for (let i=0;i<MultiArr.length;i++){
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(MultiArr[i].data);
          XLSX.utils.book_append_sheet(wb, worksheet, MultiArr[i].sheet);
        }
        /* save to file */
        XLSX.writeFile(wb, filename + '.xlsx');
    
      }
      gGetDate4Cal(par: any): any {
        const dt = par.split('-');
        return {
          year: Number(dt[0]),
          month: Number(dt[1]),
          day: Number(dt[2]),
        };
      }
      gGetDate(par: any): any {
        return formatDate(
          par.year + '-' + par.month + '-' + par.day,
          'dd-MMM-yyyy',
          this.localtimezone
        );
      }
    
      gGetDateddMMMyyyy(par: Date): any {
        return formatDate(par, 'dd-MMM-yyyy', this.localtimezone);
      }
    
}