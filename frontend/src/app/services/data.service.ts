import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get(`${environment._baseurl}get_list`);
  }

  saveData(data:any){
    return this.http.post(`${environment._baseurl}save`, data);
  }

  updateData(data:any){
    return this.http.post(`${environment._baseurl}update`, data);
  }

  deleteData(data:any){
    return this.http.post(`${environment._baseurl}delete`, data);
  }
}
