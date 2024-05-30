import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient) {}
    private urlGet="http://localhost:8080/products/stocks"
    private urlPut="http://localhost:9000/stocks/"
    private urlPost="http://localhost:9000/stocks"
    getProductStocks(id:number){
     // return this.http.get(this.urlGet+id);
     return this.http.get(`${this.urlGet}${id}`).pipe(
      map(data => Array.isArray(data) ? data : [data]));
    }
    getAllStock(){
      return this.http.get(this.urlGet);
    }
    updateStock(id:number,stock:number){
      console.log(this.urlPut +id,stock)
      return this.http.put(this.urlPut +id,{"stockAvailable":stock});
    }
    createStock(stock:any){
      return this.http.post(this.urlPost,stock)
    }
}
