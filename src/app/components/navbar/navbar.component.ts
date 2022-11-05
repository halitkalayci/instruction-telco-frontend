import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogin = this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
    // this.router.navigateByUrl('/login');
    this.router.navigate(['login']);
  }
}
