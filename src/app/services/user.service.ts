import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: UserDetails | null = null;
  private localStorageUserKey = 'user';

  constructor(private http: HttpClient) {}

  get user(): UserDetails | null {
    return this._user || this.getUserFromLocalStorage();
  }

  set user(user: UserDetails) {
    this._user = user;
    if (user === null) {
      this.removeUserFromLocalStorage();
    } else {
      this.saveUserToLocalStorage(user);
    }
  }

  private saveUserToLocalStorage(user: UserDetails): void {
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(this.localStorageUserKey);
  }

  private getUserFromLocalStorage(): UserDetails | null {
    const userString = localStorage.getItem(this.localStorageUserKey);
    if (!userString) {
      return null;
    }
    return JSON.parse(userString);
  }
}
