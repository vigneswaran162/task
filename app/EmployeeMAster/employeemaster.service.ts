import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeemasterService {

  constructor() { }

  storeData(key: string, data: any): void {
    const dataJson = JSON.stringify(data);
    localStorage.setItem(key, dataJson);
  }

  // Retrieve data from localStorage
  retrieveData(key: string): any {
    const dataJson = localStorage.getItem(key);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  }
}
