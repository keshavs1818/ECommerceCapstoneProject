import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SalesService } from '../sales.service';
import { StocksService } from '../stocks.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[HomeService,SalesService,StocksService, HttpClient]
})
export class HomeComponent {
  constructor(private homeService:HomeService ,private saleService:SalesService,private stockService:StocksService, private http:HttpClient){}
  id:any;
  name:any;
  price:any;
  category:any;
  imageUrl:any;
  saleId:number;
  stockId:number;
  count:number=0;
  user:any;
  data = "productdetails";
  payLoadUser:any;
  payloadSales:any;
  payloadStocks:any;
  fileName="";

  saveUser () 
  {
    this.payLoadUser = {'id': this.id, 'name': this.name, 'price': this.price, 'category':this.category, 'imageUrl':this.imageUrl,"stockId":this.stockId,"saleId":this.saleId };
    this.payloadSales={"saleId":this.saleId, "quantities":[], "dates":[]};
    this.payloadStocks={"stockId":this.stockId,"stockAvailable":15};
    this.homeService.createUser(this.payLoadUser).subscribe(data=>console.log(data));
    this.stockService.createStock(this.payloadStocks).subscribe();
    this.saleService.createSales(this.payloadSales).subscribe();
    alert("Product Created")
    console.log("User updated");
  }
  removeUser () 
  {
    this.homeService.deleteUser(this.id).subscribe(data=>console.log(data));
    console.log("User deleted");
  }
  async loadUsers()
  {
    try {
      this.user = await this.homeService.getUsers().toPromise();
      console.log("Users loaded");
      console.log(this.user);
    } catch(error) {
      console.log(error)
    }
    
  }
  decCount()
  {
    if(this.count>0){
    this.count -= 1;
    }
  }
  incCount()
  {
    this.count += 1;
  }
  onFileSelected(event){
    const file:File= event.target.files[0];
    if(file){
      this.fileName=file.name;
      const formData= new FormData();
      formData.append("file",file);
      this.homeService.bulkUpload(formData).subscribe();
      const reader = new FileReader();

      // Set up the callback for when the file is fully read
      reader.onload = (e) => {
        const csvData = reader.result as string;
        this.extractColumnData(csvData, 'saleId');
        this.extractColumnData(csvData,"stockId")// Change 'id' to the actual column name you want to extract
      };

      // Initiate the file reading process
      reader.readAsText(file);
      console.log("users sent")
    }
  }
  extractColumnData(csvData: string, columnName: string) {
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        const data = result.data;
        const columnData = data.map(row => row[columnName]).filter(value => value !== undefined);
        const ids = columnData.map(id => parseInt(id, 10)); // Ensure the IDs are integers
        this.sendIdsToApi(ids,columnName);
        console.log(ids,columnName)
      }
    });
  }
  sendIdsToApi(ids: number[],columnName:String) {
    if(columnName==="saleId"){
    ids.forEach(id => {
      this.payloadSales={"saleId":id, "quantities":[], "dates":[]};
      this.saleService.createSales(this.payloadSales).subscribe(data=>console.log(data))
      console.log("ran sales");
    });}
    else{
      ids.forEach(id => {
        this.payloadStocks={"stockId":id, "stockAvailable":15};
        this.stockService.createStock(this.payloadStocks).subscribe()
        console.log("ran stocks")
      });}
    }
  onImgSelected(event){
    const file:File= event.target.files[0];
    if(file){
      this.fileName=file.name;
      const formData= new FormData();
      formData.append("file",file);
      this.homeService.imgUpload(formData).subscribe();
      console.log("Image sent " + this.fileName)
      
    }
  }
}

