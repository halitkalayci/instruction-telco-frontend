import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginDto } from '../models/loginDto';
import { LoginResponseModel } from '../models/loginResponseModel';
import { ResponseModel } from '../models/responseModel';
import { TokenUserModel } from '../models/tokenUserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerUrl = `${environment.apiUrl}/auth`;
  // private, protected, public(default)
  //* Events, bir event'in tetiklendiğini, bir event'in tetiklendiğini dinleyen bir sınıflardır.
  //* - EventEmitter:  component.html tarafında, @Output() ile kullanılır.
  //* - Subject: component.ts arası kullanılır.
  //* - BehaviorSubject: Subject'ın bir türüdür. Subject'ın ilk değerini alır.
  onLogin = new BehaviorSubject<string>('Hoşgeldiniz!');
  //todo: move state container with ngrx
  tokenUserModel: TokenUserModel | null = null;

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
    // this.onLogin.complete(); // Subject artık complete oldu.
    // this.onLogin = new Subject<string>(); // Subject'i yeniden oluşturduk., Yeni bir referans aldık.
    // //* Fakat subscribe olmuş olanlar, bu event'i yakalayamayacaklar. Çünkü önceki referansa subscribe oldular.
  }
}
