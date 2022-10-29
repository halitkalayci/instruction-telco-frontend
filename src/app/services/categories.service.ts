import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // private httpClient: HttpClient;
  // getCategoriesResponse: Object = {};

  constructor(private httpClient: HttpClient) {
    // this.httpClient = httpClient;
  }

  // Generic / Jenerik beraber class'lara ve metotlara üzerinde çalışlacak bir tip geçebiliyoruz.
  getCategories(): Observable<any[]> {
    //get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<any[]>('http://localhost:3000/categories');
  }
}
