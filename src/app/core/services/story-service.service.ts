
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Story {
  storyName: string;
  storyUrl: string;
  coverPageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class StoryServiceService {
  private apiUrl = 'https://focusi.runasp.net/api/ChildClass/Story';

  constructor(private http: HttpClient) {}

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.apiUrl);
  }
}
