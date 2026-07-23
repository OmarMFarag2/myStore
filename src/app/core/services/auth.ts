import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, tap } from 'rxjs';
import { env } from '../../../env/env';
import { IJWT, ILogin, ILoginRes } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  private isAuthanticate = new BehaviorSubject<string | null>(null);

  apiURL = env.apiURL + 'auth/login';

  isUser() {
    const token = this.getToken();
    if (token) {
      const decoded = this.jwtDecoding(token);
      if (decoded) {
        return decoded.role;
      }
    }
    return null;
  }
  isLogedIn() {
    return this.isAuthanticate.asObservable();
  }

  onInitAuth() {
    const token = this.getToken();
    if (token) {
      const decoded = this.jwtDecoding(token);
      if (decoded) {
        return this.isAuthanticate.next(decoded.name);
      }
    }
    this.isAuthanticate.next(null);
  }

  login(data: ILogin) {
    return this._http.post<ILoginRes>(this.apiURL, data).pipe(
      tap((res) => {
        const token = res.JWT;
        this.storeToken(token);

        //npm i jwt-decode
        const decodedToken = this.jwtDecoding(token);
        if (decodedToken) {
          //
          this.setUserLogin(decodedToken.name);
          //
          if (decodedToken.role === 'user') {
            this._router.navigate(['/home']);
          } else {
            this._router.navigate(['/dashboard', 'home']);
          }
        }
      }),
    );
  }

  //
  setUserLogin(name: string) {
    this.isAuthanticate.next(name);
  }
  //

  jwtDecoding(token: string): IJWT | null {
    try {
      const decode = jwtDecode<IJWT>(token);
      console.log(decode.exp);
      console.log(Date.now());

      if (!decode) {
        return null;
      } else {
        const expiry = decode.exp * 1000;
        if (Date.now() > expiry) {
          return null;
        }
      }
      return decode;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  private token_key = 'token';
  private storeToken(token: string) {
    localStorage.setItem(this.token_key, token);
  }

  getToken() {
    return localStorage.getItem(this.token_key);
  }

  private deleteToken() {
    localStorage.removeItem(this.token_key);
  }

  logout() {
    this.deleteToken();
    this.isAuthanticate.next(null);
    this._router.navigate(['/home']);
  }
}
