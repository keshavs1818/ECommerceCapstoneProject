import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  constructor(private http:HttpClient, private auth: AuthService) { }
  private urlDelete = 'http://localhost:8080/users/';

  private urlPut='http://localhost:8080/users/';

  private urlPost = 'http://localhost:8080/user';

  private urlGet = 'http://localhost:8080/users';

  private urlGetID = 'http://localhost:8080/users/';

  private authHeaders:HttpHeaders = this.auth.getAuthHeaders();

  createUser(user:any)

  {

    return this.http.post(this.urlPost, user, {headers: this.authHeaders});

  }

  updateUser(user:any,id:number)

  {

    return this.http.put(this.urlPut+id,user,{headers: this.authHeaders});

  }

  deleteUser(id:number)

  {

    return this.http.delete(this.urlDelete+id, {headers: this.authHeaders});

  }

  searchUser(id:number)

  {

    return this.http.get(this.urlGetID+id, {headers: this.authHeaders});

  }

  getUsers()

  {

    return this.http.get(this.urlGet, {headers: this.authHeaders});

  }
}
