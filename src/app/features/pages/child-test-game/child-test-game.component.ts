
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChildServiceService } from '../../../core/services/child-service.service';
import { ChangeDetectorRef } from '@angular/core'; 


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

constructor(private router: Router, private http: HttpClient,  private childService: ChildServiceService, private cdr: ChangeDetectorRef) {}

  @ViewChild('camera') cameraElement!: ElementRef<HTMLVideoElement>;

  deck: Card[] = [];
  flippedCards: number[] = [];
  matchedPairs = 0;
  totalFlips = 0;
  timeElapsed = 0;
  timerInterval: any;
  maxTime = 120;

   childData: any;
  showClassModal = false;

truePhotoCount: number = 0;
totalPhotosSent: number = 0;


  gameStarted = false; 
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

    this.deck.forEach(card => card.flipped = true);

    setTimeout(() => {
      this.deck.forEach(card => card.flipped = false);
      this.showAllCardsTemporarily = false;
      this.allCardsFlipped = true;
    }, 1000);

    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
      if (this.timeElapsed >= this.maxTime) {
        clearInterval(this.timerInterval);
        this.showGameOver = true;
        this.gameStarted = false; 
      }
    }, 1000); 
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
    // this.playFlipSound(card.value);

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

  // playFlipSound(value: string) {
  //   if (!this.isSoundOn) return;
  //   const audio = new Audio(`assets/sounds/${this.getSoundName(value)}.mp3`);
  //   audio.play();
  // }

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

sendGameTestData() {
  const token = localStorage.getItem('userToken');

  const payload = {
    totalPhotos: parseFloat(this.totalPhotosSent.toFixed(1)),
    truePhotos: parseFloat(this.truePhotoCount.toFixed(1))
  };

  fetch('https://focusi.runasp.net/api/Tests/gameTest', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
    .then(async response => {
      if (!response.ok) {
        const errorBody = await response.json();
        console.error('❌ Failed to send API data:', errorBody);
        throw new Error(errorBody?.errorMessage || 'API response not OK');
      }
      console.log('✅ Game test data sent successfully!');
    })
    .catch(error => {
      console.error('❌ Failed to send API data:', error);
    });
}

  fireConfetti() {
    console.log('🎉 Confetti!');
    this.sendGameTestData();
    localStorage.setItem('isChildTestDone', 'true');
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
    this.checkAndShowClass();
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

          fetch('https://amira44-newfocus.hf.space/predict', {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(result => {
            if (result.isFocused === true) {
              this.truePhotoCount = (this.truePhotoCount || 0) + 1;
            }
            this.totalPhotosSent = (this.totalPhotosSent || 0) + 1;
          })
          .catch(err => console.error('Camera track failed:', err));
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

   private checkAndShowClass() {
    const gameDone  = localStorage.getItem('isChildTestDone')  === 'true';
    const videoDone = localStorage.getItem('isVideoTestDone') === 'true';
    const parentDone = localStorage.getItem('isParentTestDone') === 'true';

    const childDone = gameDone || videoDone;


  if (parentDone && childDone && !this.showClassModal) {
    this.childService.getChildProfile().subscribe({
      next: res => {
        this.childData = res.child || res;
        this.showClassModal = true;
        this.cdr.detectChanges();
      },
        error: err => console.error('❌ getChildProfile:', err)
      });
    }
  }

  confirmClassModal() {
    this.showClassModal = false;
    this.router.navigate(['/main/class']);
  }
 
}
