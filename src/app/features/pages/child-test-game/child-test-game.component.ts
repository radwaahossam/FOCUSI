// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-child-test-game',
//   imports: [],
//   templateUrl: './child-test-game.component.html',
//   styleUrl: './child-test-game.component.css'
// })
// export class ChildTestGameComponent {

// }


// child-test-game.component.ts
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  standalone: true,
  selector: 'app-child-test-game',
  imports: [CommonModule],
  templateUrl: './child-test-game.component.html',
  styleUrls: ['./child-test-game.component.css']
})

export class ChildTestGameComponent implements OnInit {
  @ViewChildren('cardEl') cardEls!: QueryList<ElementRef>;
  @ViewChild('confettiCanvas') confettiCanvas!: ElementRef;


  cardsList = Array(8).fill(0);
  cardImages: string[] = [];

  time = 0;
  flips = 0;
  maxTime = 600;
  timer: any;
  isPaused = false;
  isPlaying = false;
  isSoundOn = true;

  matchedCard = 0;
  disableDeck = false;
  showIntro = true;
  showMenu = false;
  showCongrats = false;
  gameOver = false;

  cardOne: HTMLElement | null = null;
  cardTwo: HTMLElement | null = null;
  cameraStream: MediaStream | null = null;
  cameraInterval: any;

  fruits = ['apple', 'grapes', 'orange', 'strawberry'];

  ngOnInit(): void {
    this.shuffleCard();
  }

  shuffleCard() {
    clearInterval(this.timer);
    this.flips = this.matchedCard = this.time = 0;
    this.cardOne = this.cardTwo = null;
    this.disableDeck = this.isPlaying = false;
    this.showCongrats = this.gameOver = false;

    let arr = this.fruits.concat(this.fruits);
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    this.cardImages = arr.map(fruit => `assets/images/fruits/${fruit}.jpg`);
  }

  startWithCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.cameraStream = stream;
        this.startCameraTracking();
        this.startGame();
      })
      .catch(() => alert('Camera access denied or not available.'));
  }

  startWithoutCamera() {
    this.startGame();
  }

  startGame() {
    this.showIntro = false;
    this.shuffleCard();
  }

  openMenu() {
    this.showMenu = true;
    this.isPaused = true;
    this.disableDeck = true;
  }

  resumeGame() {
    this.showMenu = false;
    this.isPaused = false;
    this.disableDeck = false;
  }

  restartGame() {
    this.shuffleCard();
    this.showMenu = false;
    this.isPaused = false;
  }

  toggleSound() {
    this.isSoundOn = !this.isSoundOn;
  }

  toggleCamera() {
    if (this.cameraStream) {
      this.stopCameraTracking();
    } else {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.cameraStream = stream;
          this.startCameraTracking();
        })
        .catch(() => alert('Camera access denied or not available.'));
    }
  }

  flipCard(card: HTMLElement, index: number) {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.timer = setInterval(() => this.initTimer(), 1000);
    }

    if (card !== this.cardOne && !this.disableDeck) {
      this.flips++;
      card.classList.add('flip');

      const flippedImg = this.cardImages[index];
      // this.playFlipSound(flippedImg);

      if (!this.cardOne) {
        this.cardOne = card;
        return;
      }

      this.cardTwo = card;
      this.disableDeck = true;
      const img1 = (this.cardOne.querySelector('.back-view img') as HTMLImageElement).src;
      const img2 = (this.cardTwo.querySelector('.back-view img') as HTMLImageElement).src;
      this.matchCards(img1, img2);
    }
  }

  // playFlipSound(src: string) {
  //   if (!this.isSoundOn) return;
  //   const match = src.match(/\/([^\/]+)\.jpg$/);
  //   if (match) {
  //     const audio = new Audio(`assets/Fruits/sounds/${match[1]}.mp3`);
  //     audio.play();
  //   }
  // }

  matchCards(img1: string, img2: string) {
    if (img1 === img2) {
      this.matchedCard++;
      this.celebrateMatch();

      if (this.matchedCard === 4) {
        setTimeout(() => this.showCongrats = true, 800);
        clearInterval(this.timer);
      }

      this.cardOne = this.cardTwo = null;
      this.disableDeck = false;
    } else {
      setTimeout(() => {
        this.cardOne?.classList.remove('flip', 'shake');
        this.cardTwo?.classList.remove('flip', 'shake');
        this.cardOne = this.cardTwo = null;
        this.disableDeck = false;
      }, 1200);
    }
  }

  celebrateMatch() {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
  }

  initTimer() {
    if (this.isPaused) return;
    this.time++;
    if (this.time >= this.maxTime) {
      clearInterval(this.timer);
      this.gameOver = true;
    }
  }

  handleExit() {
    this.stopCameraTracking();

    const resultData = { time: this.time, flips: this.flips };
    fetch('https://your-backend.com/api/submit-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to send results.');
        window.history.back();
      })
      .catch(err => alert('Error submitting result: ' + err.message));
  }

  startCameraTracking() {
    const video = document.createElement('video');
    video.style.display = 'none';
    document.body.appendChild(video);
    video.srcObject = this.cameraStream;
    video.play();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    this.cameraInterval = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (blob) {
            const formData = new FormData();
            formData.append('image', blob, 'snapshot.jpg');

            fetch('https://your-backend.com/api/track-player', {
              method: 'POST',
              body: formData
            }).catch(err => console.error('Failed to send image:', err));
          }
        }, 'image/jpeg', 0.8);
      }
    }, 5000);
  }

  stopCameraTracking() {
    if (this.cameraInterval) clearInterval(this.cameraInterval);
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
    const video = document.querySelector('video');
    if (video) video.remove();
  }
}

