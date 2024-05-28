import { Component } from '@angular/core';
import { StocksService } from '../stocks.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent {
  constructor(private stockService:StocksService ,private http:HttpClient){}

  product:any
  id:number
  loadStocks()
  {
    this.stockService.getProductStocks(this.id).subscribe(data=>{
      if (Array.isArray(data)) {
        this.product = data;
      } else {
        console.error('Expected an array, but got:', data);
      }
      console.log(data);}
    );
    console.log("Stocks loaded");
  }
}
