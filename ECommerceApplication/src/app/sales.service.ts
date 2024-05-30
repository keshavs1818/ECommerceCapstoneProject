import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http:HttpClient) { }
  private urlGet="http://localhost:8080/products/sales"
  private urlPost="http://localhost:9005/sales"
  getAllSales(){
    return this.http.get(this.urlGet);
  }
  createSales(sales:any){
    return this.http.post(this.urlPost,sales);
  }
}
