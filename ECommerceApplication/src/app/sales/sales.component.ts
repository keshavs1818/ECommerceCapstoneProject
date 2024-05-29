import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StocksComponent } from '../stocks/stocks.component';
import { StocksService } from '../stocks.service';
import { SalesService } from '../sales.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',

})
export class SalesComponent implements OnInit{
constructor(private salesService:SalesService, private http:HttpClient, ){}
ngOnInit(): void {
  this.loadAll();
}
product:any
id:number
loadAll(){
  this.salesService.getAllSales().subscribe(data=>this.product=data)
}
}
