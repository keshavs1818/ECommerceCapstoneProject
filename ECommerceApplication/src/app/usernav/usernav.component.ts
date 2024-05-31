import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrl: './usernav.component.css'
})
export class UsernavComponent {
  constructor(private auth:AuthService, private router:Router){}
  logoutAction() {
    // remove roles and auth
    this.auth.setAuthHeaders(null);
    this.auth.setAuthRole(null);
    this.router.navigate(['/login']);
  }
}
