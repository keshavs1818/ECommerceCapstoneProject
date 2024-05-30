import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient, private authService: AuthService) { } // Inject HTTPClient using DI
  /* This URL for REST API call to Spring Boot REST API application*/
  private urlDelete = 'http://localhost:8080/users/';
  private urlPut='http://localhost:8080/users/';
  private urlPost = 'http://localhost:8080/product';
  private urlGet = 'http://localhost:8080/products';
  private bulkUrlPost= 'http://localhost:8080/product/csv';
  private imgUrlPost= 'http://localhost:8080/product/img';
  // jinkang added
  private urlCreateUser = 'http://localhost:8080/createUser';

  // headers for authentication
  private authHeaders:HttpHeaders = this.authService.getAuthHeaders();

  createUser(user:any)
  {
    return this.http.post(this.urlCreateUser, user);
  }
  updateUser(user:any,id:number)
  {
    return this.http.put(this.urlPut+id, user, {headers: this.authHeaders});
  }
  deleteUser(id:number)
  {
    return this.http.delete(this.urlDelete+id, {headers: this.authHeaders});
  }
  getUsers()
  {
    return this.http.get(this.urlGet, {headers: this.authHeaders});
  }
  bulkUpload(file:FormData){
    return this.http.post(this.bulkUrlPost,file, {headers: this.authHeaders})
  }
  imgUpload(file:FormData){
    return this.http.post(this.imgUrlPost,file, {headers: this.authHeaders})
  }
}