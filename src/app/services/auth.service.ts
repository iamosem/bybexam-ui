import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { API_URL } from '../app.constants';
import { LoginDetails, UserDetails } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${API_URL}/user`;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
  ) {}

  isLoggedIn(): boolean {
    return !!this.userService.user;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.userService.user = null;
    this.router.navigate(['/login']);
  }

  getUser(): Observable<UserDetails> {
    return this.http.get(this.apiUrl).pipe(
      map(response => response as UserDetails),
      tap(user => this.userService.user = user),
    );
  }

  registerUser(request: UserDetails): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request).pipe(
      map(response => response as UserDetails),
      switchMap(() => this.loginUser({ email: request.email, password: request.password })),
    );
  }

  loginUser(loginRequest: LoginDetails): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, loginRequest).pipe(
      map(response => response?.['access_token'] as string),
      tap(token => localStorage.setItem('access_token', token)),
    );
  }
}
