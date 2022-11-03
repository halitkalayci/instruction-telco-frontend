import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../models/loginDto';
import { ResponseModel } from '../models/responseModel';
import { LoginResponseModel } from '../models/loginResponseModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerUrl = `${environment.apiUrl}/auth`;

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
}
