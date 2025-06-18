
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildServiceService {
  constructor(private http: HttpClient, public authService: AuthService) {}

getChildProfile(): Observable<any> {
  const token = localStorage.getItem('userToken');
  const headers = { 'Authorization': `Bearer ${token}` };

  return this.http.get('https://focusi.runasp.net/api/Account/CurrentUser', { headers });
}

addProfilePicture(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('Picture', file);

  return this.http.put('https://focusi.runasp.net/api/Account/addProfilePicture', formData, {
    responseType: 'text' as 'json' 
  });
}

updateChildProfile(name: string, age: number, picture?: File): Observable<any> {
  const formData = new FormData();
  formData.append('Name', name != null ? name.trim() : '');
  formData.append('Age', Math.floor(age).toString()); 

  if (picture) {
    const sanitizedFileName = this.sanitizeFileName(picture.name);
    const cleanFile = new File([picture], sanitizedFileName, { type: picture.type });
    formData.append('Picture', cleanFile);
  }

  const token = localStorage.getItem('userToken');
  const headers = { 'Authorization': `Bearer ${token}` };

  return this.http.put('https://focusi.runasp.net/api/Account/editProfile', formData, { headers });
}

private sanitizeFileName(name: string): string {
  const timestamp = Date.now();
  const extension = name.substring(name.lastIndexOf('.') + 1);
  return `profile_${timestamp}.${extension}`;
}
}




