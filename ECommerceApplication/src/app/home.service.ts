import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { } // Inject HTTPClient using DI
  /* This URL for REST API call to Spring Boot REST API application*/
  private urlDelete = 'http://localhost:8080/products/';
  private urlPut='http://localhost:8080/products/';
  private urlPost = 'http://localhost:8080/product';
  private urlGet = 'http://localhost:8080/products';
  private bulkUrlPost= 'http://localhost:8080/product/csv';
  private imgUrlPost= 'http://localhost:8080/product/img';
  private urlSearch = 'http://localhost:8080/products/name/';
  createProduct(user:any)
  {
    return this.http.post(this.urlPost, user);
  }
  updateProduct(user:any,id:number)
  {
    return this.http.put(this.urlPut+id,user);
  }
  deleteProduct(id:number)
  {
    return this.http.delete(this.urlDelete+id);
  }
  searchProducts(name:any)
  {
    return this.http.get(this.urlSearch+name).pipe(map(data => Array.isArray(data) ? data : [data]));;
  }
  getProducts()
  {
    return this.http.get(this.urlGet);
  }
  bulkUpload(file:FormData){
    return this.http.post(this.bulkUrlPost,file)
  }
  imgUpload(file:FormData){
    return this.http.post(this.imgUrlPost,file)
  }
}