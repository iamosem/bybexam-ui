import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private isLoadingSubject: BehaviorSubject<boolean>;

  constructor() {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  get isLoading(): boolean {
    return this.isLoadingSubject.value;
  }

  setAppLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }
}
