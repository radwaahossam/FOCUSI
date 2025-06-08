// import { isPlatformBrowser } from '@angular/common';
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TestStateService {
//     private isBrowser: boolean;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   get isParentTestDone(): boolean {
//     return this.isBrowser && localStorage.getItem('isParentTestDone') === 'true';
//   }

//   get isChildTestDone(): boolean {
//     return this.isBrowser && localStorage.getItem('isChildTestDone') === 'true';
//   }

//   get isVideoTestDone(): boolean {
//     return this.isBrowser && localStorage.getItem('isVideoTestDone') === 'true';
//   }

//   loadFromLocalStorage() {
//     // لو محتاج تعمل أي شغل في الـ APP_INITIALIZER
//     // بس حالياً مش لازم أي حاجة هنا
//   }
// }

