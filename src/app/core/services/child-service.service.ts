
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildServiceService {
  constructor(private http: HttpClient, public authService: AuthService) {}

getChildProfile(): Observable<any> {
  if (typeof window !== 'undefined') {
  console.log('Sending token:', localStorage.getItem('userToken'));
  }
  return this.http.get('http://focusi.runasp.net/api/Account/CurrentUser');
}

addProfilePicture(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('Picture', file);

  return this.http.put('http://focusi.runasp.net/api/Account/addProfilePicture', formData, {
    responseType: 'text' as 'json' 
  });
}
}




