import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare global {
  interface Window {
    angularComponentRef: {
      zone: NgZone;
      router: Router;
    };
  }
}

@Component({
  selector: 'app-video-test',
  imports: [],
  templateUrl: './video-test.component.html',
  styleUrl: './video-test.component.css'
})

export class VideoTestComponent implements OnInit {
  constructor(private router: Router, private ngZone: NgZone) {}

ngOnInit(): void {
  window.angularComponentRef = {
    zone: this.ngZone,
    router: this.router
  };
}
}



