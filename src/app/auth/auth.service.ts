import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  '../interfaces/user';
import { AuthResponse } from  '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8000/api';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }


  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/user`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("token", res.user.token);
          // await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User) {
    return new Promise((resolve, reject) => {
      var data = {
        username: user.username,
        password: user.password
      };

      this.httpClient.post(this.AUTH_SERVER_ADDRESS + '/login', data)
        .subscribe((result: any) => {
          this.storage.set("token", result.token);
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async logout() {
    await this.storage.remove("token");
    // await this.storage.remove("EXPIRES_IN");

    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
