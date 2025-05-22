import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthUser, loginUser } from '../../interfaces/auth-user';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {


//   _httpClient = inject (HttpClient)
//   userData:BehaviorSubject<any> = new BehaviorSubject(null)

//   constructor() { }

//     registerUser(userInfo:AuthUser): Observable<any>{
//       return this._httpClient.post(`http://focusi.runasp.net/api/Account/register`, userInfo)
//     }

//     loginUser(userInfo:loginUser): Observable<any>{
//       return this._httpClient.post(`http://focusi.runasp.net/api/Account/login`, userInfo)
//     }

//     saveUser(){
//       if(localStorage.getItem("userToken")){
//         this.userData.next(jwtDecode(localStorage.getItem("userToken")!))
//         console.log(this.userData)
//       }
//     }

//     isLoggedInUser(): boolean {
//       const token = localStorage.getItem("userToken");
//       if (token) {
//         try {
//           const decoded = jwtDecode(token);
//           this.userData.next(decoded);
//           return true;
//         } catch (error) {
//           console.error("Invalid token", error);
//           this.userData.next(null);
//           return false;
//         }
//       } else {
//         return false;
//       }
//     }
//   }




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _httpClient = inject(HttpClient)
    // _baseURL = inject (API_BASE_URL)

  userData: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() { }

  registerUser(userInfo: AuthUser): Observable<any> {
    return this._httpClient.post(`http://focusi.runasp.net/api/Account/register`, userInfo)
  }

  loginUser(userInfo: loginUser): Observable<any> {
    return this._httpClient.post(`http://focusi.runasp.net/api/Account/login`, userInfo)
  }

  saveUser() {
    if (localStorage.getItem("userToken")) {
      this.userData.next(jwtDecode(localStorage.getItem("userToken")!))
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
}
