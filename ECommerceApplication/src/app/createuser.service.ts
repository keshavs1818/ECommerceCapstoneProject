import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  constructor(private http:HttpClient) { }
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
