import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http:HttpClient) { }
  private urlGet="http://localhost:8080/products/sales"

  getAllSales(){
    return this.http.get(this.urlGet);
  }
}
