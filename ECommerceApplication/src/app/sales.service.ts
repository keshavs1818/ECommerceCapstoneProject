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
  getAllSales(){
    return this.http.get(this.urlGet,{headers: this.authHeader});
  }
}
