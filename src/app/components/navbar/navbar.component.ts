import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  //* @Output() event kanalı tanımlar.
  //* EventEmitter sadece componentler arası, HTML tarafında iletişim için kullanılır.
  @Output() onLogout = new EventEmitter<void>();
  @Output() onLogoutWithValue = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.handleOnLogin();
  }

  logout() {
    this.authService.logout();
    // this.router.navigateByUrl('/login');
    this.isLogin = this.authService.isAuthenticated;
    //* Event'i emit eder/tetikler.
    this.onLogout.emit();
    //* Event'i bir veriyle emit eder/tetikler.
    this.onLogoutWithValue.emit('Hoşçakal, tekrar bekleriz...');

    this.router.navigate(['login']);
  }

  handleOnLogin(): void {
    //* onLogin event'ine (subject) abone olduk, dolayısıyla her tetiklendiğinde ilgili event fonksiyonu çalışır.
    this.authService.onLogin.subscribe({
      complete: () => {
        this.isLogin = this.authService.isAuthenticated;
      },
    });
  }
}
