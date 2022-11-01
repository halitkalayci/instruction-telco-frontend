import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: boolean = false;
  isLoadingSubject: Subject<boolean> = new Subject<boolean>();
  constructor() {}

  startLoading() {
    this.isLoading = true;
    this.isLoadingSubject.next(true);
  }
  stopLoading() {
    this.isLoading = false;
    this.isLoadingSubject.next(false);
  }
}
