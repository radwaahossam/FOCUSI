
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Card {
  value: string;
  flipped: boolean;
  matched: boolean;
}
@Component({
  selector: 'app-child-test-game',
  imports: [CommonModule],
  templateUrl: './child-test-game.component.html',
  styleUrl: './child-test-game.component.css'
})


export class ChildTestGameComponent implements OnInit {

  constructor(private router: Router) {}

  @ViewChild('camera') cameraElement!: ElementRef<HTMLVideoElement>;

  deck: Card[] = [];
  flippedCards: number[] = [];
  matchedPairs = 0;
  totalFlips = 0;
  timeElapsed = 0;
  timerInterval: any;
  maxTime = 120;

  gameStarted = false; // تم تعديل هذه القيمة لتكون false عند البداية
  showStats = false;
  showGame = false;
  showCongrats = false;
  showGameOver = false;
  showMenu = false;
  isSoundOn = true;
  cameraRequired = true;

  cameraStream: MediaStream | null = null;
  cameraTrackingInterval: any;

  readonly symbols = ['🍎', '🍌', '🍇', '🍓', '🍉'];

  showAllCardsTemporarily = true;
  allCardsFlipped = false;

  ngOnInit(): void {
    // تم تعليق الكود الخاص بالكاميرا هنا
    // this.requestCamera();
  }

  async requestCamera() {
    try {
      this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.cameraElement.nativeElement.srcObject = this.cameraStream;
      this.cameraElement.nativeElement.play();
      this.cameraRequired = false;
      this.startCameraTracking();
    } catch (err) {
      alert('You must open the camera');
    }
  }

  async startGame() {
    if (this.cameraRequired) {
      await this.requestCamera();
    }

    this.matchedPairs = 0;
    this.totalFlips = 0;
    this.timeElapsed = 0;
    this.showCongrats = false;
    this.showGameOver = false;
    this.showGame = true;
    this.showStats = true;
    this.gameStarted = true; 
    this.showAllCardsTemporarily = true;
    this.allCardsFlipped = false;


    this.deck = this.shuffle([...this.symbols, ...this.symbols].map(value => ({
      value,
      flipped: false,
      matched: false
    })));

    // تقليب الكروت جميعها مؤقتًا
    this.deck.forEach(card => card.flipped = true);

    // إغلاقهم بعد فترة
    setTimeout(() => {
      this.deck.forEach(card => card.flipped = false);
      this.showAllCardsTemporarily = false;
      this.allCardsFlipped = true;
    }, 1000);

    // بدء العد التنازلي
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
      if (this.timeElapsed >= this.maxTime) {
        clearInterval(this.timerInterval);
        this.showGameOver = true;
        this.gameStarted = false; // إيقاف اللعبة عند انتهاء الوقت
      }
    }, 1000); // كل ثانية
  }

  shuffle(array: Card[]): Card[] {
    return array.sort(() => Math.random() - 0.5);
  }

  flipCard(index: number) {
    const card = this.deck[index];
    if (!this.allCardsFlipped || card.flipped || card.matched || this.flippedCards.length >= 2) return;

    card.flipped = true;
    this.flippedCards.push(index);
    this.totalFlips++;
    this.playFlipSound(card.value);

    if (this.flippedCards.length === 2) {
      setTimeout(() => this.checkMatch(), 800);
    }
  }

  checkMatch() {
    const [i1, i2] = this.flippedCards;
    const card1 = this.deck[i1];
    const card2 = this.deck[i2];

    if (card1.value === card2.value) {
      card1.matched = true;
      card2.matched = true;
      this.matchedPairs++;

      if (this.matchedPairs === 5) {
        clearInterval(this.timerInterval);
        this.showCongrats = true;
        this.gameStarted = false;
        this.fireConfetti();
      }
    } else {
      card1.flipped = false;
      card2.flipped = false;
    }
    this.flippedCards = [];
  }

  playFlipSound(value: string) {
    if (!this.isSoundOn) return;
    const audio = new Audio(`assets/sounds/${this.getSoundName(value)}.mp3`);
    audio.play();
  }

  getSoundName(emoji: string): string {
    switch (emoji) {
      case '🍎': return 'apple';
      case '🍌': return 'banana';
      case '🍇': return 'grapes';
      case '🍓': return 'strawberry';
      case '🍉': return 'watermelon';
      default: return 'flip';
    }
  }

  fireConfetti() {
    console.log('🎉 Confetti!');
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleSound() {
    this.isSoundOn = !this.isSoundOn;
  }

  toggleCamera() {
    if (this.cameraStream) {
      this.stopCameraTracking();
    } else {
      this.requestCamera();
    }
  }

  retryGame() {
    this.startGame();
    this.showMenu = false;
  }

  exitMenuOnly() {
    this.showMenu = false;
    console.log('Menu Exit Clicked');

  }
  
  exitGame() {
    this.stopCameraTracking();
    localStorage.setItem('isChildTestDone', 'true');
    this.router.navigate(['/video-test']);

    // this.router.navigate(['/video-test']);   
  }


  startCameraTracking() {
    const video = this.cameraElement.nativeElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    this.cameraTrackingInterval = setInterval(() => {
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
            }).catch(err => console.error('Camera track failed:', err));
          }
        }, 'image/jpeg', 0.8);
      }
    }, 5000);
  }

  stopCameraTracking() {
    if (this.cameraTrackingInterval) clearInterval(this.cameraTrackingInterval);
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
  }
}
