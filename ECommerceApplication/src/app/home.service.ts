import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { } // Inject HTTPClient using DI
  /* This URL for REST API call to Spring Boot REST API application*/
  private urlDelete = 'http://localhost:8080/users/';
  private urlPut='http://localhost:8080/users/';
  private urlPost = 'http://localhost:8080/product';
  private urlGet = 'http://localhost:8080/products';
  private bulkUrlPost= 'http://localhost:8080/product/csv';
  createUser(user:any)
  {
    return this.http.post(this.urlPost, user);
  }
  updateUser(user:any,id:number)
  {
    return this.http.put(this.urlPut+id,user);
  }
  deleteUser(id:number)
  {
    return this.http.delete(this.urlDelete+id);
  }
  getUsers()
  {
    return this.http.get(this.urlGet);
  }
  bulkUpload(file:FormData){
    return this.http.post(this.bulkUrlPost,file)
  }
}