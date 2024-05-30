import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http:HttpClient, private authService:AuthService) { }
  private urlGet="http://localhost:8080/products/sales"
  private authHeader = this.authService.getAuthHeaders();
  private urlPost="http://localhost:9005/sales"
  private urlPut="http://localhost:9005/sales/"
  getAllSales(){
    // return this.http.get(this.urlGet,{headers: this.authHeader});
    return this.http.get(this.urlGet);
  }
  createSales(sales:any){
    return this.http.post(this.urlPost,sales);
  }
  updateSales(saleId:number,sale:any){
    return this.http.put(this.urlPut+saleId,sale);
  }
}
