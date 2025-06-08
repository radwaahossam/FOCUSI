// import { CanActivateFn } from '@angular/router';

// export const testDoneGuard: CanActivateFn = (route, state) => {
//   return true;
// };



// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';

// export const TestDoneGuard: CanActivateFn = () => {
//   const router = inject(Router);

//   const isParentTestDone = localStorage.getItem('isParentTestDone') === 'true';
//   const isChildTestDone = localStorage.getItem('isChildTestDone') === 'true';
//   const isVideoTestDone = localStorage.getItem('isVideoTestDone') === 'true';

//   if (!isParentTestDone) {
//     router.navigate(['/parent-test']);
//     return false;
//   }

//   if (!isChildTestDone) {
//     router.navigate(['/child-test']);
//     return false;
//   }

//   if (!isVideoTestDone) {
//     router.navigate(['/video-test']);
//     return false;
//   }

//   return true;
// };



// import { inject } from '@angular/core';
// import { CanActivateFn } from '@angular/router';
// import { Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';
// import { PLATFORM_ID } from '@angular/core';

// export const TestDoneGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const platformId = inject(PLATFORM_ID);

//   if (!isPlatformBrowser(platformId)) {
//     return false;
//   }

//   const isParentTestDone = localStorage.getItem('isParentTestDone') === 'true';
//   const isChildTestDone = localStorage.getItem('isChildTestDone') === 'true';
//   const isVideoTestDone = localStorage.getItem('isVideoTestDone') === 'true';

//    if (!isParentTestDone) {
//     return router.parseUrl('/parent-test');
//   }

//   if (!isChildTestDone) {
//     return router.parseUrl('/child-test');
//   }

//   if (!isVideoTestDone) {
//     return router.parseUrl('/video-test');
//   }

//   return true;
// };


// // test-done.guard.ts
// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { TestStateService } from '../../services/features/services/test-state.service' ;

// export const TestDoneGuard: CanActivateFn = (): boolean | import("@angular/router").UrlTree => {
//   const router = inject(Router);
//   const testState = inject(TestStateService);

//   if (!testState.isParentTestDone) return router.parseUrl('/parent-test');
//   if (!testState.isChildTestDone) return router.parseUrl('/child-test');
//   if (!testState.isVideoTestDone) return router.parseUrl('/video-test');

//   return true;
// };



// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';
// import { TestStateService } from '../../services/features/services/test-state.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class TestDoneGuard implements CanActivate {
//   private isBrowser: boolean;

//   constructor(
//     private testStateService: TestStateService,
//     private router: Router,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   canActivate(): boolean {
//     if (!this.isBrowser) return false;

//     if (this.testStateService.isVideoTestDone) {
//       return true;
//     } else {
//       this.router.navigate(['/video-test']);
//       return false;
//     }
//   }
// }
