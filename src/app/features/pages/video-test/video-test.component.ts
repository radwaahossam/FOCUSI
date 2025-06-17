import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interactive-video',
  imports: [ CommonModule ],
  templateUrl: './video-test.component.html',
  styleUrls: ['./video-test.component.css'],
})
export class VideoTestComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('cameraFeed') cameraFeed!: ElementRef<HTMLVideoElement>;

  showIntroOverlay = true;
  videoStarted = false;
  cameraEnabled = false;

  startWithoutCamera() {
    this.showIntroOverlay = false;
    this.videoStarted = true;
    this.playVideo();
  }

  startWithCamera() {
    this.showIntroOverlay = false;
    this.videoStarted = true;
    this.cameraEnabled = true;
    this.playVideo();
    this.startCamera();
  }

  playVideo() {
    setTimeout(() => {
      this.videoPlayer.nativeElement.play();
    }, 100); // slight delay to ensure DOM is ready
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.cameraFeed.nativeElement.srcObject = stream;
      })
      .catch(err => {
        console.error('Camera access denied:', err);
      });
  }
}
