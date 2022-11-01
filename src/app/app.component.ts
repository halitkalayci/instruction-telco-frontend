import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.subscribeToLoading();
  }
  title = 'telco-frontend12';

  sumOfNumbers(a: number, b: number) {
    let result = a + b;
    // console.log(result);
    return result;
  }

  btnClick() {
    alert('Butona tıklandı');
  }

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      console.log(`Servisten dönen loading sonucu ${isLoading}`);
    });
  }

  startLoading() {
    this.loadingService.startLoading();
  }
  stopLoading() {
    this.loadingService.stopLoading();
  }
}
