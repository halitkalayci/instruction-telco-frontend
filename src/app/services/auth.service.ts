import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginDto } from '../models/loginDto';
import { LoginResponseModel } from '../models/loginResponseModel';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerUrl = `${environment.apiUrl}/auth`;
  // private, protected, public(default)
  onLogin = new Subject<string>();

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  login(loginDto: LoginDto): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      `${this.controllerUrl}/login`,
      loginDto
    );
  }

  logout() {
    this.localStorage.remove('token');
  }

  get isAuthenticated(): boolean {
    // varsa süresi geçmişse yine false
    let token = this.localStorage.get('token');
    if (!token) return false;
    if (this.jwtHelperService.isTokenExpired()) return false;
    return true;
  }

  get jwtToken(): string | null {
    return this.localStorage.get('token');
  }

  emitOnLoginEvent(eventValue: string) {
    this.onLogin.next(eventValue);
    // this.onLogin.error(new Error("Bir hata oluştu"));
    this.onLogin.complete();
  }
}
