import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesService } from '../sales.service';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor( private http:HttpClient,private saleService:SalesService,private stockService:StocksService ){}
  storedCart:any;
  productStock:any;
  payloadSales:any;
  ngOnInit(): void {
    this.storedCart = JSON.parse(localStorage.getItem("cart"));
  }
  purchase(id:number,stockId:number,saleId:number,count:number){
    console.log(stockId,saleId,count)
    this.payloadSales={"saleId":saleId, "quantities":[count], "dates":[new Date()]};
    this.stockService.getProductStocks2(id).subscribe(data=>{
    
        this.productStock = data;
    
      console.log(data);
      console.log("product"+ this.productStock.stock.stockAvailable)
      console.log("Stocks loaded");
      console.log(this.productStock.stock.stockAvailable-count)
      console.log("sale"+saleId)
      
      this.stockService.updateStock(stockId,this.productStock.stock.stockAvailable-count).subscribe(data=>console.log(data));
      this.saleService.updateSales(saleId,this.payloadSales).subscribe(data=>console.log(data));}
     
    );
    localStorage.removeItem("cart");
  }
  processPurchases(purchases:any,): void {
    purchases.forEach(purchase => {
      console.log(purchase.a, purchase.g, purchase.e)
      this.purchase(purchase.a, purchase.f, purchase.g, purchase.e);
    });
}
  clearCart(){
    localStorage.removeItem("cart");
    window.location.reload();
  }
}
