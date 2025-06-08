import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-test',
  imports: [],
  templateUrl: './video-test.component.html',
  styleUrl: './video-test.component.css'
})

export class VideoTestComponent {
//  isBrowser: boolean;

//   constructor(
//     public router: Router,
//     private zone: NgZone,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   ngOnInit(): void {
//     if (this.isBrowser) {
//       (window as any).angularComponentRef = {
//         zone: this.zone,
//         router: this.router
//       };
//     }
//   }

//   ngOnDestroy(): void {
//     if (this.isBrowser) {
//       (window as any).angularComponentRef = null;
//     }
//   }
}
// export class VideoTestComponent {
  
// constructor(
//   private router: Router,
//   private ngZone: NgZone,
//   @Inject(PLATFORM_ID) private platformId: Object
// ) {}

// ngOnInit() {
//   if (isPlatformBrowser(this.platformId)) {
//     (window as any).angularComponentRef = {
//       zone: this.ngZone,
//       router: this.router
//     };
//   }
// }



