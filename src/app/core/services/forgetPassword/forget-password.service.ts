import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private readonly http: HttpClient) { }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(`https://focusi.runasp.net/api/Account/forgetpassword`, data)
  }

  // resetPassword(data: any): Observable<any> {
  //   return this.http.post(`http://focusi.runasp.net/api/Account/resetPassword`, data)
  // }



  resetPassword(data: {email:string, newPassword:string, confirmPassword:string, token:string}) {
  const url = `https://focusi.runasp.net/api/Account/resetPassword?token=${encodeURIComponent(data.token)}`;
  const body = {
    email: data.email,
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword
  };
  return this.http.post(url, body, { responseType: 'text' });
}


}
