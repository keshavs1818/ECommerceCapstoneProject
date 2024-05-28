import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient) {}
    private urlGet="http://localhost:8080/products/stocks/"
    private urlPut="http://localhost:9000/stocks/"
    getProductStocks(id:number){
     // return this.http.get(this.urlGet+id);
     return this.http.get(`${this.urlGet}${id}`).pipe(
      map(data => Array.isArray(data) ? data : [data]));
    }
    updateStock(id:number,stock:number){
      return this.http.put(this.urlPut +id,stock);
    }
}
