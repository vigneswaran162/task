import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemmasterService {

  private APIUrl: string;

  constructor(private http:HttpClient) { }

  apiurl="http://localhost:8098/api/"


  async  getreport(): Promise<any> {
    let url = this.apiurl + 'ItemMaster';
    const response = await this.http.get(url).toPromise();
    return response;
  }

  async  getalldata(): Promise<any> {
    let url = this.apiurl + 'alldata';
    const response = await this.http.get(url).toPromise();
    return response;
  }
 async getall(): Promise<any> {
  let url = this.apiurl + 'item';
  const response = await this.http.get(url).toPromise();
  return response;

}
async GetById(id: string): Promise<any> {
  let url = this.apiurl +'getbyid?itemdescription=' + id;
  const response = await this.http.get(url).toPromise();
  return response;

}

async getuomdesc(): Promise<any> {
  let url = this.apiurl + 'uom' ;
  const response = await this.http.get(url).toPromise();
  return response;

}
 

 
 
async  getaddposmodule(): Promise<any> {
  let url = this.apiurl + 'pos';
  const response = await this.http.get(url).toPromise();
  return response;
}


  async getadduomitem(entity:any): Promise<any> {

  this.APIUrl = this.apiurl + 'adduom';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };

  let response = this.http.post(this.APIUrl,entity,options).toPromise();
  return response
 

 
}


async createposmodule(entity:any): Promise<any> {

  this.APIUrl = this.apiurl + 'addpos';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };

  let response = await this.http.post(this.APIUrl,entity,options).toPromise();
  return response;


}


 async createdata(entity:any): Promise<any> {

  this.APIUrl = this.apiurl + 'insert';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };
  let response = await this.http.post(this.APIUrl, entity, options).toPromise()
  return response;
 


}


async updatedata(entity:any): Promise<any> {
  this.APIUrl = this.apiurl + 'update';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };
 
  let response = await this.http.post(this.APIUrl, entity, options).toPromise()
  return response;
}

 async voiditem(entity:any): Promise<any> {
  this.APIUrl = this.apiurl + 'void';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };
  let response = await this.http.post(this.APIUrl,entity,options).toPromise();
  return response

}


async GetReport(entity:any): Promise<any> {

  this.APIUrl = this.apiurl + 'SetReport';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  let options = {
    headers: headers,
  };

  let response = this.http.post(this.APIUrl,entity,options).toPromise();
  return response
 

 
}
}
