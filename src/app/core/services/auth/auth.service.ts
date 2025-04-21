import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthUser, loginUser } from '../../interfaces/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  _httpClient = inject (HttpClient)
  constructor() { }

    registerUser(userInfo:AuthUser): Observable<any>{
      return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userInfo)
    }

    loginUser(userInfo:loginUser): Observable<any>{
      return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userInfo)
    }
}


