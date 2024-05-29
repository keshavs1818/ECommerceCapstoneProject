import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient, private authService: AuthService) {}
    private urlGet="http://localhost:8080/products/stocks"
    private urlPut="http://localhost:9000/stocks/"
    private authHeader = this.authService.getAuthHeaders();
    getProductStocks(id:number){
     // return this.http.get(this.urlGet+id);
     return this.http.get(`${this.urlGet}${id}`).pipe(
      map(data => Array.isArray(data) ? data : [data]));
    }
    getAllStock(){
      return this.http.get(this.urlGet);
    }
    updateStock(id:number,stock:number){
      return this.http.put(this.urlPut +id,stock);
    }
}
