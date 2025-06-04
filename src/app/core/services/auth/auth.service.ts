import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthUser, loginUser } from '../../interfaces/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _httpClient = inject(HttpClient)
  userData: BehaviorSubject<any> = new BehaviorSubject(null)

  registerUser(userInfo: AuthUser): Observable<any> {
    return this._httpClient.post(`http://focusi.runasp.net/api/Account/register`, userInfo);
  }

  loginUser(userInfo: loginUser): Observable<any> {
    return this._httpClient.post(`https://focusi.runasp.net/api/Account/login`, userInfo);
  }

  saveUser() {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        this.userData.next(decoded);
      } catch (e) {
        console.error("Invalid token in saveUser()", e);
        this.userData.next(null);
      }
    }
  }

  isLoggedInUser(): boolean {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        this.userData.next(decoded);
        return true;
      } catch (error) {
        console.error("Invalid token", error);
        this.userData.next(null);
        return false;
      }
    } else {
      return false;
    }
  }
  getLoggedInUserEmail(): string | null {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return null;
  }
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const payload = jwtDecode(token) as any;
    return payload.email || null;
  } catch (e) {
    console.error('Invalid token format', e);
    return null;
  }
}


  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem("userToken");
    const headers = { 'Authorization': `Bearer ${token}` };
    return this._httpClient.get(`http://focusi.runasp.net/api/Account/CurrentUser`, { headers });
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('Picture', file);

    const token = localStorage.getItem("userToken");
    const headers = { 'Authorization': `Bearer ${token}` };

    return this._httpClient.put(`http://focusi.runasp.net/api/Account/addProfilePicture`, formData, { headers });
  }

  updateCurrentUser(data: any): Observable<any> {
  const token = localStorage.getItem("userToken");
  const headers = { 'Authorization': `Bearer ${token}` };
  return this._httpClient.put(`http://focusi.runasp.net/api/Account/CurrentUser`, data, { headers });
}

logout(): Observable<any> {
  return this._httpClient.get('http://focusi.runasp.net/api/Account/logout');
}


}
