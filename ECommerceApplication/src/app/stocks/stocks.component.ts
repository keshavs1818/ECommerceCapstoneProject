import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit{
  constructor(private stockService:StocksService ,private http:HttpClient){}
ngOnInit(): void {
    this.loadAll();
}
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
  loadAll(){
    this.stockService.getAllStock().subscribe(data=>this.product=data)
  }
  addStocks(stockid:number,curentStock:number){
    curentStock+=10;
    this.stockService.updateStock(stockid,curentStock).subscribe(data=>{console.log(data)
  console.log("Added 10 Stocks")})
  console.log(stockid + " " +curentStock)
  }
}
