// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Child } from '../interfaces/child';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChildServiceService {

//   constructor() { }

//   getChildProfile(): Observable<Child> {
//     // هنا المفروض تطلعي الداتا من API حقيقية
//     // أنا هحط بس دلوقتي Example لحد ما تربطيه بالباك اند
//     const child: Child = {
//       id: '1',
//       email: 'kid@example.com',
//       gender: 'Male',
//       age: 8,
//       accountCreatedAt: '2025-04-25',
//       className: 'Focus Class A',
//       totalScore: 85,
//       imageUrl: 'assets/images/default-profile.png'
//     };

//     return of(child); 
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildServiceService {
  constructor(private http: HttpClient) {}

  // getChildProfile() {
  //   // API حقيقية
  //   // return this.http.get('/api/child/profile');

  //   // أو بيانات تجريبية
  //   return of({
  //     name: '',
  //     email: '',
  //     gender: '',
  //     age: '',
  //     createdAt: new Date(''),
  //     assignedClass: '',
  //     score: 85,
  //     photoUrl: null,
  //   });
  // }



  // saveChildProfile(data: any) {
  //   // return this.http.put('/api/child/profile', data);
    
  //   // أو نحاكي حفظ
  //   return of(data);
  // }




  getChildProfile() {
    if (typeof window !== 'undefined') {
      const storedProfile = window.localStorage.getItem('childProfile');
      if (storedProfile) {
        return of(JSON.parse(storedProfile));
      }
    }
    return of(null);
  }
  
  saveChildProfile(data: any) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('childProfile', JSON.stringify(data));
    }
    return of(data);
  }
}

