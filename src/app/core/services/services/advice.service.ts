import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdviceService {

  private apiUrl = 'https://focusi.runasp.net/api/ChildClass/Advice';

  constructor(private http: HttpClient) {}

  getAdviceList(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
