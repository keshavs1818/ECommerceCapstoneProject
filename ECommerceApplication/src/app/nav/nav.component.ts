import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn () {
    if (this.auth.getRole() == null) {
      return false;
    } return true;
  }
  logoutAction() {
    // remove roles and auth
    this.auth.setAuthHeaders(null);
    this.auth.setAuthRole(null);
    this.router.navigate(['/login']);
  }
}
