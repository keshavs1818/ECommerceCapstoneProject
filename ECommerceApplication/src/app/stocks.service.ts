import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient, private authService: AuthService) {}
    private urlGet="http://localhost:8080/products/stocks"
    private urlGetid="http://localhost:8080/products/stocks/"
    private urlPut="http://localhost:9000/stocks/"
    private authHeader:HttpHeaders = this.authService.getAuthHeaders();
    private urlPost="http://localhost:9000/stocks"
    getProductStocks(id:number){
     // return this.http.get(this.urlGet+id);
     return this.http.get(`${this.urlGetid}${id}`,{headers: this.authHeader}).pipe(
      map(data => Array.isArray(data) ? data : [data]));
    }
    getProductStocks2(id:number){
      // return this.http.get(this.urlGet+id);
      return this.http.get(`${this.urlGetid}${id}`, {headers: this.authHeader})
     }
    getAllStock(){
      return this.http.get(this.urlGet, {headers: this.authHeader});
    }
    updateStock(id:number,stock:number){
      console.log(this.urlPut +id,stock)
      return this.http.put(this.urlPut +id,{"stockAvailable":stock});
    }
    updateStockCart(id:number,stock:number){
      return this.http.put(this.urlPut +id,stock)
    }
    createStock(stock:any){
      return this.http.post(this.urlPost,stock)
    }
}
