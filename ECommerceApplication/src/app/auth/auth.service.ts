import { Injectable } from '@angular/core';
import {HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  private token = localStorage.getItem('token');
  private role;
  getAuthHeaders() {
    return new HttpHeaders({'Authorization': 'Bearer ' + this.token});
  }
  setAuthHeaders(token: string) {
    this.token = token;
  }

  getRole() {
    return this.role;
  }
  setAuthRole(role: string) {
    this.role = role;
  }
}
