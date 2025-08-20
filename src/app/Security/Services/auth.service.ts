import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  userState$: Observable<boolean> = this.isLoggedIn.asObservable();

  constructor() {}

  login(username: string, password: string): Observable<boolean> {
    return of(username === 'admin' && password === '12345').pipe(
      delay(500),
      tap((success) => {
        if (success) {
          localStorage.setItem(this.TOKEN_KEY, 'fake_token');
          this.isLoggedIn.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn.value;
  }
}
