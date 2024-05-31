import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private http:HttpClient) { } // Inject HTTPClient using DI
  /* This URL for REST API call to Spring Boot REST API application*/
  private urlDelete = 'http://localhost:8080/users/';
  private urlPut='http://localhost:8080/users/';
  private urlPost = 'http://localhost:8080/user';
  private urlGet = 'http://localhost:8080/users';
  private urlGetID = 'http://localhost:8080/users/';
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
  searchUser(id:number)
  {
    return this.http.get(this.urlGetID+id);
  }
  getUsers()
  {
    return this.http.get(this.urlGet);
  }
}