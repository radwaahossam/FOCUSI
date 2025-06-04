// import { isPlatformBrowser } from '@angular/common';
// import { AfterViewInit, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-video-test',
//   imports: [],
//   templateUrl: './video-test.component.html',
//   styleUrl: './video-test.component.css'
// })
// export class VideoTestComponent {
  

// }





// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, ViewChild, NgZone, AfterViewInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-video-test',
//   imports: [CommonModule],
//   templateUrl: './video-test.component.html',
//   styleUrls: ['./video-test.component.css']
// })
// export class VideoTestComponent implements AfterViewInit {


//   @ViewChild('videoElement') videoRef!: ElementRef<HTMLVideoElement>;
//   @ViewChild('questionContent') questionContentRef!: ElementRef<HTMLDivElement>;

//   introOverlayShown = true;
//   overlayShown = false;
//   showCongrats = false;
//   showGameOver = false;

//   currentQuestionIndex = 0;
//   correctAnswers = 0;
//   pausedForQuestions = false;

//   questions = [
//     {
//         type: 'image-choice',
//         question: "Which shape is round like an egg?",
//         audio: {
//             questionAudio: 'audios/question1.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong1.mp3'      
//         },
//         choices: [
//             { img: 'images/circle.png', isCorrect: false },
//             { img: 'images/oval.png', isCorrect: true }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape is perfectly round?",
//         audio: {
//             questionAudio: 'audios/question2.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong2.mp3'      
//         },
//         choices: [
//             { img: 'images/circle.png', isCorrect: true },
//             { img: 'images/oval.png', isCorrect: false }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape has four equal sides?",
//         audio: {
//             questionAudio: 'audios/question3.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong3.mp3'      
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: false },
//             { img: 'images/square.png', isCorrect: true }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape is lined has four sides?",
//         audio: {
//             questionAudio: 'audios/question4.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong4.mp3'      
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: true },
//             { img: 'images/square.png', isCorrect: false }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape has five points?",
//         audio: {
//             questionAudio: 'audios/question5.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong5.mp3'      
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: false },
//             { img: 'images/star.png', isCorrect: true },
//             { img: 'images/oval.png', isCorrect: false }
//         ]
//     }
// ];

//   questionAudio!: HTMLAudioElement;

//   constructor(private router: Router, private zone: NgZone) {}

//   ngAfterViewInit(): void {
//     (window as any).angularNavigateToClass = () => {
//       this.zone.run(() => {
//         this.router.navigate(['/class']);
//       });
//     };
//   }

//   startWithCamera(): void {
//     this.startVideo();
//     // هنا ضيف كود فتح الكاميرا لو حبيت
//     this.introOverlayShown = false;
//   }

//   startWithoutCamera(): void {
//     this.startVideo();
//     this.introOverlayShown = false;
//   }

//   startVideo(): void {
//     const video = this.videoRef.nativeElement;
//     video.controls = true;
//     video.play();

//     video.addEventListener('timeupdate', () => {
//       if (!this.pausedForQuestions && video.currentTime >= 26) {
//         this.pausedForQuestions = true;
//         video.pause();
//         this.overlayShown = true;
//         this.showQuestion(this.currentQuestionIndex);
//       }
//     });
//   }

//   showQuestion(index: number): void {
//     const q = this.questions[index];
//     const content = this.questionContentRef.nativeElement;
//     content.innerHTML = `<h2>${q.question}</h2>`;

//     this.questionAudio = new Audio(q.audio.questionAudio);
//     this.questionAudio.play();

//     q.choices.forEach(choice => {
//       const btn = document.createElement('button');
//       btn.innerHTML = `<img src="${choice.img}" alt="shape">`;
//       btn.onclick = () => this.handleAnswer(choice.isCorrect);
//       content.appendChild(btn);
//     });
//   }

//   handleAnswer(isCorrect: boolean): void {
//     const q = this.questions[this.currentQuestionIndex];
//     const feedback = new Audio(isCorrect ? q.audio.correctAudio : q.audio.wrongAudio);
//     if (this.questionAudio && !this.questionAudio.paused) {
//       this.questionAudio.pause();
//       this.questionAudio.currentTime = 0;
//     }
//     feedback.play();

//     if (isCorrect) this.correctAnswers++;

//     const delay = isCorrect ? 1000 : 3000;
//     setTimeout(() => {
//       this.currentQuestionIndex++;
//       if (this.currentQuestionIndex === 1) {
//         this.showQuestion(this.currentQuestionIndex);
//       } else if (this.currentQuestionIndex === 2) {
//         this.overlayShown = false;
//         this.videoRef.nativeElement.play();
//       } else if (this.currentQuestionIndex < this.questions.length) {
//         this.showQuestion(this.currentQuestionIndex);
//       } else {
//         this.overlayShown = false;
//         this.showFinalResult();
//       }
//     }, delay);
//   }

//   onVideoEnded(): void {
//     if (this.currentQuestionIndex < this.questions.length) {
//       this.overlayShown = true;
//       this.showQuestion(this.currentQuestionIndex);
//     }
//   }

//   showFinalResult(): void {
//     if (this.correctAnswers >= 3) {
//       this.showCongrats = true;
//     } else {
//       this.showGameOver = true;
//     }
//   }

//   handleExit(): void {
//     if ((window as any).angularNavigateToClass) {
//       (window as any).angularNavigateToClass();
//     }
//   }

//   tryAgain(): void {
//     this.correctAnswers = 0;
//     this.currentQuestionIndex = 0;
//     this.pausedForQuestions = false;
//     this.introOverlayShown = true;
//     this.showCongrats = false;
//     this.showGameOver = false;
//   }
// }














import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-test',
  templateUrl: './video-test.component.html',
  styleUrls: ['./video-test.component.css']
})
export class VideoTestComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {}

  // @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('questionOverlay', { static: true }) overlayRef!: ElementRef<HTMLDivElement>;
  @ViewChild('questionBox', { static: true }) questionBoxRef!: ElementRef<HTMLDivElement>;
  @ViewChild('questionContent', { static: true }) questionContentRef!: ElementRef<HTMLDivElement>;
  @ViewChild('introOverlay', { static: true }) introOverlayRef!: ElementRef<HTMLDivElement>;
  @ViewChild('congratsOverlay', { static: true }) congratsOverlayRef!: ElementRef<HTMLDivElement>;
  @ViewChild('overOverlay', { static: true }) overOverlayRef!: ElementRef<HTMLDivElement>;
  @ViewChild('congratsCorrectAnswers', { static: true }) congratsCorrectAnswersRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('overCorrectAnswers', { static: true }) overCorrectAnswersRef!: ElementRef<HTMLSpanElement>;

  cameraStream: MediaStream | null = null;
  cameraInterval: any = null;

  currentQuestionIndex = 0;
  correctAnswers = 0;
  pausedForQuestions = false;
  questionAudio: HTMLAudioElement | null = null;

  questions = [
    {
      type: 'image-choice',
      question: "Which shape is round like an egg?",
      audio: {
        questionAudio: 'assets/video-test/audios/question1.mp3',
        correctAudio: 'assets/video-test/audios/correct.mp3',
        wrongAudio: 'assets/video-test/audios/wrong1.mp3'
      },
      choices: [
        { img: 'assets/video-test/images/circle.png', isCorrect: false },
        { img: 'assets/video-test/images/oval.png', isCorrect: true }
      ]
    },
    {
      type: 'image-choice',
      question: "Which shape is perfectly round?",
      audio: {
        questionAudio: 'assets/video-test/audios/question2.mp3',
        correctAudio: 'assets/video-test/audios/correct.mp3',
        wrongAudio: 'assets/video-test/audios/wrong2.mp3'
      },
      choices: [
        { img: 'assets/video-test/images/circle.png', isCorrect: true },
        { img: 'assets/video-test/images/oval.png', isCorrect: false }
      ]
    },
    {
      type: 'image-choice',
      question: "Which shape has four equal sides?",
      audio: {
        questionAudio: 'assets/video-test/audios/question3.mp3',
        correctAudio: 'assets/video-test/audios/correct.mp3',
        wrongAudio: 'assets/video-test/audios/wrong3.mp3'
      },
      choices: [
        { img: 'assets/video-test/images/rectangle.png', isCorrect: false },
        { img: 'assets/video-test/images/square.png', isCorrect: true }
      ]
    },
    {
      type: 'image-choice',
      question: "Which shape is lined has four sides?",
      audio: {
        questionAudio: 'assets/video-test/audios/question4.mp3',
        correctAudio: 'assets/video-test/audios/correct.mp3',
        wrongAudio: 'assets/video-test/audios/wrong4.mp3'
      },
      choices: [
        { img: 'assets/video-test/images/rectangle.png', isCorrect: true },
        { img: 'assets/video-test/images/square.png', isCorrect: false }
      ]
    },
    {
      type: 'image-choice',
      question: "Which shape has five points?",
      audio: {
        questionAudio: 'assets/video-test/audios/question5.mp3',
        correctAudio: 'assets/video-test/audios/correct.mp3',
        wrongAudio: 'assets/video-test/audios/wrong5.mp3'
      },
      choices: [
        { img: 'assets/video-test/images/rectangle.png', isCorrect: false },
        { img: 'assets/video-test/images/star.png', isCorrect: true },
        { img: 'assets/video-test/images/oval.png', isCorrect: false }
      ]
    }
  ];

ngOnInit() {

  this.videoRef.nativeElement.onloadedmetadata = () => {
      console.log('metadata loaded');

    this.setupTimeTracking();
  };

  this.videoRef.nativeElement.addEventListener('ended', () => {
  if (this.currentQuestionIndex < this.questions.length) {
    this.overlayRef.nativeElement.style.display = 'flex';
    this.showQuestion(this.currentQuestionIndex); // يبدأ من السؤال 3
  }
});

}

private setupTimeTracking(): void {
  // عرض السؤالين الأوائل بعد 26 ثانية
  setTimeout(() => {
    if (!this.pausedForQuestions) {
      this.pausedForQuestions = true;
      this.videoRef.nativeElement.pause();
      this.overlayRef.nativeElement.style.display = 'flex';
      this.showQuestion(0);  // السؤال الأول
    }
  }, 26000); // 26 ثانية بالمللي ثانية
}




//   ngOnInit() {
//    this.videoRef.nativeElement.onloadedmetadata = () => {
//     this.scheduleQuestionPopup(26);
//   };



//     this.videoRef.nativeElement.addEventListener('timeupdate', () => {
//       if (!this.pausedForQuestions && this.videoRef.nativeElement.currentTime >= 26) {
//         this.pausedForQuestions = true;
//         this.videoRef.nativeElement.pause();
//         this.overlayRef.nativeElement.style.display = 'flex';
//         this.showQuestion(this.currentQuestionIndex);
//       }
//     });

//     this.videoRef.nativeElement.addEventListener('ended', () => {
//       if (this.currentQuestionIndex < this.questions.length) {
//         this.overlayRef.nativeElement.style.display = 'flex';
//         this.showQuestion(this.currentQuestionIndex);
//       }
//     });
//   }

//   scheduleQuestionPopup(seconds: number) {
//   const checkInterval = setInterval(() => {
//     const currentTime = this.videoRef.nativeElement.currentTime;
//     if (!this.pausedForQuestions && currentTime >= seconds) {
//       clearInterval(checkInterval);
//       this.pausedForQuestions = true;
//       this.videoRef.nativeElement.pause();
//       this.overlayRef.nativeElement.classList.add('show');
//       this.overlayRef.nativeElement.classList.remove('hidden');
//       this.showQuestion(this.currentQuestionIndex);
//     }
//   }, 300);
// }


  startVideo() {
    this.introOverlayRef.nativeElement.classList.add('hidden');
    this.videoRef.nativeElement.play();
  }

  async startWithCamera() {
    try {
      this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.startCameraTracking();
    } catch {
      alert("Camera access denied or not available.");
    }
    this.startVideo();
  }

  startWithoutCamera() {
    this.startVideo();
  }

  startCameraTracking() {
    if (!this.cameraStream) return;

    const video = document.createElement('video');
    video.style.display = 'none';
    document.body.appendChild(video);
    video.srcObject = this.cameraStream;
    video.play();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;

    this.cameraInterval = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (blob) {
            const formData = new FormData();
            formData.append("image", blob, "snapshot.jpg");
            // Send to backend if needed
            // fetch("https://your-backend.com/api/track-player", { method: "POST", body: formData });
          }
        }, "image/jpeg", 0.8);
      }
    }, 5000);
  }

  showQuestion(index: number) {
    const content = this.questionContentRef.nativeElement;
    content.innerHTML = ''; // تنظيف المحتوى

    const question = this.questions[index];
    content.innerHTML = `<h2>${question.question}</h2>`;
    this.overlayRef.nativeElement.classList.remove('hidden');
    this.overlayRef.nativeElement.classList.add('show');


    this.questionAudio = new Audio(question.audio.questionAudio);
    this.questionAudio.play();

    question.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.innerHTML = `<img src="${choice.img}" alt="shape">`;
      btn.onclick = () => this.handleAnswer(choice.isCorrect);
      content.appendChild(btn);
    });
  }

  handleAnswer(isCorrect: boolean) {
    const question = this.questions[this.currentQuestionIndex];
    const feedbackAudio = new Audio(isCorrect ? question.audio.correctAudio : question.audio.wrongAudio);

    if (this.questionAudio && !this.questionAudio.paused) {
      this.questionAudio.pause();
      this.questionAudio.currentTime = 0;
    }

    feedbackAudio.play();

    if (isCorrect) this.correctAnswers++;

    setTimeout(() => {
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.questions.length) {
  this.showQuestion(this.currentQuestionIndex);
} else {
  this.overlayRef.nativeElement.classList.remove('hidden');
  this.overlayRef.nativeElement.classList.add('show');
  this.showFinalResult();
}


      // if (this.currentQuestionIndex < this.questions.length) {
      //   this.showQuestion(this.currentQuestionIndex);
      // } else {
      //   this.overlayRef.nativeElement.style.display = 'none';
      //   this.showFinalResult();
      // }
    }, isCorrect ? 1000 : 3000);
  }

  showFinalResult() {
    this.congratsCorrectAnswersRef.nativeElement.textContent = this.correctAnswers.toString();
    this.overCorrectAnswersRef.nativeElement.textContent = this.correctAnswers.toString();

    if (this.correctAnswers >= 3) {
      this.congratsOverlayRef.nativeElement.classList.remove('hidden');
    } else {
      this.overOverlayRef.nativeElement.classList.remove('hidden');
    }
  }

  tryAgain() {
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
    this.pausedForQuestions = false;
    this.introOverlayRef.nativeElement.classList.remove('hidden');
    this.congratsOverlayRef.nativeElement.classList.add('hidden');
    this.overOverlayRef.nativeElement.classList.add('hidden');
  }

  handleExit() {
    this.stopCamera();
    this.router.navigate(['/main/class']);
  }

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
    if (this.cameraInterval) {
      clearInterval(this.cameraInterval);
      this.cameraInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  
  // sendResultsToBackend(score: number) {
  //   fetch("https://your-backend.com/api/results", {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ correctAnswers: score })
  //   }).then(res => res.json())
  //     .then(data => console.log("Results sent:", data))
  //     .catch(err => console.error("Failed to send results:", err));
  // }

}















// import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-video-test',
//   templateUrl: './video-test.component.html',
//   styleUrls: ['./video-test.component.css']
// })
// export class VideoTestComponent implements OnInit, AfterViewInit, OnDestroy {

//   constructor(private router: Router) {}

//   @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
//   @ViewChild('questionOverlay') overlayRef!: ElementRef<HTMLDivElement>;
//   @ViewChild('questionBox') questionBoxRef!: ElementRef<HTMLDivElement>;
//   @ViewChild('introOverlay') introOverlayRef!: ElementRef<HTMLDivElement>;
//   @ViewChild('congratsOverlay') congratsOverlayRef!: ElementRef<HTMLDivElement>;
//   @ViewChild('overOverlay') overOverlayRef!: ElementRef<HTMLDivElement>;

//   currentQuestionIndex = 0;
//   correctAnswers = 0;

//   cameraStream: MediaStream | null = null;
//   cameraInterval: any = null;
//   questionAudio: HTMLAudioElement | null = null;
//   pausedForQuestions = false;

//   questions = [
//     {
//       type: 'image-choice',
//       question: "Which shape is round like an egg?",
//       audio: {
//         questionAudio: 'assets/audios/question1.mp3',  
//         correctAudio: 'assets/audios/correct.mp3',   
//         wrongAudio: 'assets/audios/wrong1.mp3'      
//       },
//       choices: [
//         { img: 'assets/images/circle.png', isCorrect: false },
//         { img: 'assets/images/oval.png', isCorrect: true }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape is perfectly round?",
//       audio: {
//         questionAudio: 'assets/audios/question2.mp3',  
//         correctAudio: 'assets/audios/correct.mp3',   
//         wrongAudio: 'assets/audios/wrong2.mp3'      
//       },
//       choices: [
//         { img: 'assets/images/circle.png', isCorrect: true },
//         { img: 'assets/images/oval.png', isCorrect: false }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape has four equal sides?",
//       audio: {
//         questionAudio: 'assets/audios/question3.mp3',  
//         correctAudio: 'assets/audios/correct.mp3',   
//         wrongAudio: 'assets/audios/wrong3.mp3'      
//       },
//       choices: [
//         { img: 'assets/images/rectangle.png', isCorrect: false },
//         { img: 'assets/images/square.png', isCorrect: true }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape is lined has four sides?",
//       audio: {
//         questionAudio: 'assets/audios/question4.mp3',  
//         correctAudio: 'assets/audios/correct.mp3',   
//         wrongAudio: 'assets/audios/wrong4.mp3'      
//       },
//       choices: [
//         { img: 'assets/images/rectangle.png', isCorrect: true },
//         { img: 'assets/images/square.png', isCorrect: false }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape has five points?",
//       audio: {
//         questionAudio: 'assets/audios/question5.mp3',  
//         correctAudio: 'assets/audios/correct.mp3',   
//         wrongAudio: 'assets/audios/wrong5.mp3'      
//       },
//       choices: [
//         { img: 'assets/images/rectangle.png', isCorrect: false },
//         { img: 'assets/images/star.png', isCorrect: true },
//         { img: 'assets/images/oval.png', isCorrect: false }
//       ]
//     }
//   ];


//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     const video = this.videoRef.nativeElement;

//     video.addEventListener('timeupdate', () => {
//       if (!this.pausedForQuestions && video.currentTime >= 26) {
//         this.pausedForQuestions = true;
//         video.pause();
//         this.showOverlay();
//         this.showQuestion(this.currentQuestionIndex);
//       }
//     });

//     video.addEventListener('ended', () => {
//       if (this.currentQuestionIndex < this.questions.length) {
//         this.showOverlay();
//         this.showQuestion(this.currentQuestionIndex);
//       }
//     });
//   }

//   startWithCamera(): void {
//     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
//       this.cameraStream = stream;
//       this.startCameraTracking();
//       this.startVideo();
//     }).catch(() => {
//       alert("Camera access denied or not available.");
//       this.startVideo();
//     });
//   }

//   startWithoutCamera(): void {
//     this.startVideo();
//   }

//   startVideo(): void {
//     this.introOverlayRef.nativeElement.classList.add('hidden');
//     const video = this.videoRef.nativeElement;
//     video.controls = true;
//     video.play();
//   }

//   stopCamera(): void {
//     if (this.cameraStream) {
//       this.cameraStream.getTracks().forEach(track => track.stop());
//       this.cameraStream = null;
//     }
//     if (this.cameraInterval) {
//       clearInterval(this.cameraInterval);
//       this.cameraInterval = null;
//     }
//   }

//   startCameraTracking(): void {
//     if (!this.cameraStream) return;

//     const videoEl = document.createElement('video');
//     videoEl.style.display = 'none';
//     document.body.appendChild(videoEl);
//     videoEl.srcObject = this.cameraStream;
//     videoEl.play();

//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     this.cameraInterval = setInterval(() => {
//       if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA && context) {
//         canvas.width = videoEl.videoWidth;
//         canvas.height = videoEl.videoHeight;
//         context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob(blob => {
//           if (blob) {
//             const formData = new FormData();
//             formData.append("image", blob, "snapshot.jpg");
//             fetch("https://your-backend.com/api/track-player", {
//               method: "POST",
//               body: formData
//             }).catch(err => console.error("Failed to send image:", err));
//           }
//         }, "image/jpeg", 0.8);
//       }
//     }, 5000);
//   }

//   showOverlay(): void {
//     this.overlayRef.nativeElement.style.display = 'flex';
//   }

//   hideOverlay(): void {
//     this.overlayRef.nativeElement.style.display = 'none';
//   }

//   showQuestion(index: number): void {
//     if (document.fullscreenElement) {
//       document.exitFullscreen();
//     }

//     const question = this.questions[index];
//     const content = this.questionBoxRef.nativeElement.querySelector('#questionContent') as HTMLElement;
//     // Clear existing content
//     content.innerHTML = '';

//     // سؤال
//     const h2 = document.createElement('h2');
//     h2.textContent = question.question;
//     content.appendChild(h2);

//     // تشغيل صوت السؤال
//     if (this.questionAudio) {
//       this.questionAudio.pause();
//       this.questionAudio.currentTime = 0;
//     }
//     this.questionAudio = new Audio(question.audio.questionAudio);
//     this.questionAudio.play();

//     // خيارات الصورة
//     question.choices.forEach(choice => {
//       const btn = document.createElement('button');
//       btn.innerHTML = `<img src="${choice.img}" alt="shape" class="max-w-[80px] max-h-[80px] mx-2" />`;
//       btn.className = 'm-2 p-2 border rounded hover:bg-gray-200';
//       btn.onclick = () => this.handleAnswer(choice.isCorrect);
//       content.appendChild(btn);
//     });
//   }

//   handleAnswer(isCorrect: boolean): void {
//     const question = this.questions[this.currentQuestionIndex];
//     const feedbackAudio = new Audio(isCorrect ? question.audio.correctAudio : question.audio.wrongAudio);
//     if (this.questionAudio && !this.questionAudio.paused) {
//       this.questionAudio.pause();
//       this.questionAudio.currentTime = 0;
//     }
//     feedbackAudio.play();

//     if (isCorrect) this.correctAnswers++;

//     const delay = isCorrect ? 1000 : 3000;

//     setTimeout(() => {
//       this.currentQuestionIndex++;
//       if (this.currentQuestionIndex === 1) {
//         this.showQuestion(this.currentQuestionIndex);
//       } else if (this.currentQuestionIndex === 2) {
//         this.hideOverlay();
//         this.videoRef.nativeElement.play();
//       } else if (this.currentQuestionIndex < this.questions.length) {
//         this.questionBoxRef.nativeElement.style.display = 'block';
//         this.showQuestion(this.currentQuestionIndex);
//       } else {
//         this.hideOverlay();
//         this.showFinalResult();
//       }
//     }, delay);
//   }

//   showFinalResult(): void {
//     if (this.correctAnswers >= 3) {
//       this.congratsOverlayRef.nativeElement.classList.remove('hidden');
//     } else {
//       this.overOverlayRef.nativeElement.classList.remove('hidden');
//     }
//   }

//   resetGame(): void {
//     this.correctAnswers = 0;
//     this.currentQuestionIndex = 0;
//     this.pausedForQuestions = false;
//     this.introOverlayRef.nativeElement.classList.remove('hidden');
//     this.congratsOverlayRef.nativeElement.classList.add('hidden');
//     this.overOverlayRef.nativeElement.classList.add('hidden');
//   }

//   handleExit(): void {
//     this.stopCamera();
//     // التنقل إلى صفحة /class
//   this.router.navigate(['/class']);
//   }

//   ngOnDestroy(): void {
//     this.stopCamera();
//     if (this.questionAudio) {
//       this.questionAudio.pause();
//       this.questionAudio = null;
//     }
//   }
// }










// import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-video-test',
//   templateUrl: './video-test.component.html',
//   styleUrl: './video-test.component.css'
// })

// export class VideoTestComponent implements OnInit, OnDestroy {

//     constructor(private router: Router) {}

//   @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
//   @ViewChild('questionOverlay') overlayRef!: ElementRef<HTMLElement>;
//   @ViewChild('questionBox') questionBoxRef!: ElementRef<HTMLElement>;
//   @ViewChild('introOverlay') introOverlayRef!: ElementRef<HTMLElement>;
//   @ViewChild('congratsOverlay') congratsOverlayRef!: ElementRef;
//   @ViewChild('overOverlay') overOverlayRef!: ElementRef<HTMLElement>;
//   @ViewChild('correctAnswersDisplay', { static: false }) correctAnswersDisplay!: ElementRef<HTMLElement>;
  

//   @ViewChild('startWithCameraBtn') startWithCameraBtnRef!: ElementRef<HTMLButtonElement>;
//   @ViewChild('startWithoutCameraBtn') startWithoutCameraBtnRef!: ElementRef<HTMLButtonElement>;
//   @ViewChild('congratsExit') congratsExitRef!: ElementRef<HTMLButtonElement>;
//   @ViewChild('exitBtn') exitBtnRef!: ElementRef<HTMLButtonElement>;
//   @ViewChild('tryAgainBtn') tryAgainBtnRef!: ElementRef<HTMLButtonElement>;

//   currentQuestionIndex = 0;
//   correctAnswers = 0;
//   cameraStream: MediaStream | null = null;
//   cameraInterval: any = null;
//   questionAudio: HTMLAudioElement | null = null;

//   firstQuestionShown = false;
//   secondQuestionShown = false;
//   pausedForQuestions = false;

//   questions = [
//     {
//       type: 'image-choice',
//       question: "Which shape is round like an egg?",
//       audio: {
//         questionAudio: 'audios/question1.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong1.mp3'
//       },
//       choices: [
//         { img: 'images/circle.png', isCorrect: false },
//         { img: 'images/oval.png', isCorrect: true }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape is perfectly round?",
//       audio: {
//         questionAudio: 'audios/question2.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong2.mp3'
//       },
//       choices: [
//         { img: 'images/circle.png', isCorrect: true },
//         { img: 'images/oval.png', isCorrect: false }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape has four equal sides?",
//       audio: {
//         questionAudio: 'audios/question3.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong3.mp3'
//       },
//       choices: [
//         { img: 'images/rectangle.png', isCorrect: false },
//         { img: 'images/square.png', isCorrect: true }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape is lined has four sides?",
//       audio: {
//         questionAudio: 'audios/question4.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong4.mp3'
//       },
//       choices: [
//         { img: 'images/rectangle.png', isCorrect: true },
//         { img: 'images/square.png', isCorrect: false }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape has five points?",
//       audio: {
//         questionAudio: 'audios/question5.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong5.mp3'
//       },
//       choices: [
//         { img: 'images/rectangle.png', isCorrect: false },
//         { img: 'images/star.png', isCorrect: true },
//         { img: 'images/oval.png', isCorrect: false }
//       ]
//     }
//   ];

//   ngOnInit(): void {
//     this.videoRef.nativeElement.addEventListener('timeupdate', () => {
//   const currentTime = this.videoRef.nativeElement.currentTime;

//   if (!this.pausedForQuestions && currentTime >= 26) {
//     this.pausedForQuestions = true;
//     this.videoRef.nativeElement.pause();
//     this.overlayRef.nativeElement.style.display = 'flex';
//     this.showQuestion(this.currentQuestionIndex);
//   }
// });
//     // this.videoRef.nativeElement.addEventListener('timeupdate', () => {
//     //   if (!this.pausedForQuestions && this.videoRef.nativeElement.currentTime >= 26) {
//     //     this.pausedForQuestions = true;
//     //     this.videoRef.nativeElement.pause();
//     //     this.overlayRef.nativeElement.style.display = 'flex';
//     //     this.showQuestion(this.currentQuestionIndex);
//     //   }
//     // });

//     this.videoRef.nativeElement.addEventListener('ended', () => {
//       if (this.currentQuestionIndex < this.questions.length) {
//         this.overlayRef.nativeElement.style.display = 'flex';
//         this.showQuestion(this.currentQuestionIndex);
//       }
//     });
//   }

//   startWithCamera(): void {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         this.cameraStream = stream;
//         this.startCameraTracking();
//         this.startVideo();
//       })
//       .catch(() => alert("Camera access denied or not available."));
//   }

//   startWithoutCamera(): void {
//     this.startVideo();
//   }

//   startVideo(): void {
//     this.introOverlayRef.nativeElement.classList.add('hidden');
//     this.videoRef.nativeElement.controls = true;
//     this.videoRef.nativeElement.play();
//   }

//   stopCamera(): void {
//     if (this.cameraStream) {
//       this.cameraStream.getTracks().forEach(track => track.stop());
//       this.cameraStream = null;
//     }
//     if (this.cameraInterval) {
//       clearInterval(this.cameraInterval);
//       this.cameraInterval = null;
//     }
//   }

//   startCameraTracking(): void {
//     const video = document.createElement("video");
//     video.style.display = "none";
//     document.body.appendChild(video);
//     video.srcObject = this.cameraStream!;
//     video.play();

//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d")!;

//     this.cameraInterval = setInterval(() => {
//       if (video.readyState === video.HAVE_ENOUGH_DATA) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob(blob => {
//           if (blob) {
//             const formData = new FormData();
//             formData.append("image", blob, "snapshot.jpg");
//             fetch("https://your-backend.com/api/track-player", {
//               method: "POST",
//               body: formData
//             }).catch(err => console.error("Failed to send image:", err));
//           }
//         }, "image/jpeg", 0.8);
//       }
//     }, 5000);
//   }

//   showQuestion(index: number): void {
//     const question = this.questions[index];
//     const content = this.questionBoxRef.nativeElement;
//     content.innerHTML = `<h2>${question.question}</h2>`;
//     this.questionAudio = new Audio(question.audio.questionAudio);
//     this.questionAudio.play();

//     question.choices.forEach(choice => {
//       const btn = document.createElement('button');
//       btn.innerHTML = `<img src="${choice.img}" alt="shape">`;
//       btn.onclick = () => this.handleAnswer(choice.isCorrect);
//       content.appendChild(btn);
//     });
//   }

//   handleAnswer(isCorrect: boolean): void {
//     const question = this.questions[this.currentQuestionIndex];
//     const feedbackAudio = new Audio(isCorrect ? question.audio.correctAudio : question.audio.wrongAudio);

//     if (this.questionAudio && !this.questionAudio.paused) {
//       this.questionAudio.pause();
//       this.questionAudio.currentTime = 0;
//     }

//     feedbackAudio.play();
//     if (isCorrect) this.correctAnswers++;

//     const delay = isCorrect ? 1000 : 3000;
//     setTimeout(() => {
//       this.currentQuestionIndex++;
//       if (this.currentQuestionIndex === 1) {
//         this.showQuestion(this.currentQuestionIndex);
//       } else if (this.currentQuestionIndex === 2) {
//         this.overlayRef.nativeElement.style.display = 'none';
//         this.videoRef.nativeElement.play();
//       } else if (this.currentQuestionIndex < this.questions.length) {
//         this.questionBoxRef.nativeElement.style.display = 'block';
//         this.showQuestion(this.currentQuestionIndex);
//       } else {
//         this.overlayRef.nativeElement.style.display = 'none';
//         this.showFinalResult();
//       }
//     }, delay);
//   }

//   showFinalResult(): void {
//     const spans = document.querySelectorAll('#correct-answers');
//     spans.forEach(span => span.textContent = this.correctAnswers.toString());

//     if (this.correctAnswers >= 3) {
//       this.congratsOverlayRef.nativeElement.classList.remove('hidden');
//     } else {
//       this.overOverlayRef.nativeElement.classList.remove('hidden');
//     }
//   }

//   tryAgain(): void {
//     this.overOverlayRef.nativeElement.classList.add('hidden');
//     this.resetGame();
//   }

//   exit(): void {
//     this.stopCamera();
//     this.router.navigate(['/class']);
//     // this.sendResultsToBackend(this.correctAnswers);
//   }

//   resetGame(): void {
//     this.correctAnswers = 0;
//     this.currentQuestionIndex = 0;
//     this.firstQuestionShown = false;
//     this.secondQuestionShown = false;
//     this.pausedForQuestions = false;

//     this.introOverlayRef.nativeElement.classList.remove('hidden');
//     this.congratsOverlayRef.nativeElement.classList.add('hidden');
//     this.overOverlayRef.nativeElement.classList.add('hidden');
//   }

//   // sendResultsToBackend(score: number): void {
//   //   fetch("https://your-backend.com/api/results", {
//   //     method: "POST",
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     },
//   //     body: JSON.stringify({ correctAnswers: score })
//   //   })
//   //   .then(res => res.json())
//   //   .then(data => console.log("Results sent:", data))
//   //   .catch(err => console.error("Failed to send results:", err));
//   // }

//   ngOnDestroy(): void {
//     this.stopCamera();
//   }
// }







// import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-video-test',
//   templateUrl: './video-test.component.html',
//   styleUrls: ['./video-test.component.css']
// })
// export class VideoTestComponent implements OnInit, OnDestroy {

//   constructor(private router: Router) {}

//   @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
//   @ViewChild('questionOverlay') overlayRef!: ElementRef<HTMLElement>;
//   @ViewChild('questionBox') questionBoxRef!: ElementRef<HTMLElement>;
//   @ViewChild('introOverlay') introOverlayRef!: ElementRef<HTMLElement>;
//   @ViewChild('congratsOverlay') congratsOverlayRef!: ElementRef<HTMLElement>;
//   @ViewChild('overOverlay') overOverlayRef!: ElementRef<HTMLElement>;

//   @ViewChild('congratsAnswers') congratsAnswersRef!: ElementRef<HTMLElement>;
//   @ViewChild('overAnswers') overAnswersRef!: ElementRef<HTMLElement>;

//   currentQuestionIndex = 0;
//   correctAnswers = 0;
//   cameraStream: MediaStream | null = null;
//   cameraInterval: any = null;
//   questionAudio: HTMLAudioElement | null = null;
//   pausedForQuestions = false;

//   // توقيت عرض كل سؤال (بالثواني)
//   questionTimings = [5, 20, 35, 50, 65];

//   questions = [
//     {
//       type: 'image-choice',
//       question: "Which shape is round like an egg?",
//       audio: {
//         questionAudio: 'audios/question1.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong1.mp3'
//       },
//       choices: [
//         { img: 'images/circle.png', isCorrect: false },
//         { img: 'images/oval.png', isCorrect: true }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape is perfectly round?",
//       audio: {
//         questionAudio: 'audios/question2.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong2.mp3'
//       },
//       choices: [
//         { img: 'images/circle.png', isCorrect: true },
//         { img: 'images/oval.png', isCorrect: false }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape has four equal sides?",
//       audio: {
//         questionAudio: 'audios/question3.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong3.mp3'
//       },
//       choices: [
//         { img: 'images/rectangle.png', isCorrect: false },
//         { img: 'images/square.png', isCorrect: true }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape is lined has four sides?",
//       audio: {
//         questionAudio: 'audios/question4.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong4.mp3'
//       },
//       choices: [
//         { img: 'images/rectangle.png', isCorrect: true },
//         { img: 'images/square.png', isCorrect: false }
//       ]
//     },
//     {
//       type: 'image-choice',
//       question: "Which shape has five points?",
//       audio: {
//         questionAudio: 'audios/question5.mp3',
//         correctAudio: 'audios/correct.mp3',
//         wrongAudio: 'audios/wrong5.mp3'
//       },
//       choices: [
//         { img: 'images/rectangle.png', isCorrect: false },
//         { img: 'images/star.png', isCorrect: true },
//         { img: 'images/oval.png', isCorrect: false }
//       ]
//     }
//   ];

//   ngOnInit(): void {
//     this.videoRef.nativeElement.addEventListener('timeupdate', () => {
//       const currentTime = this.videoRef.nativeElement.currentTime;

//       // عرض السؤال حسب الوقت المناسب
//       if (!this.pausedForQuestions &&
//           this.currentQuestionIndex < this.questionTimings.length &&
//           currentTime >= this.questionTimings[this.currentQuestionIndex]) {
//         this.pausedForQuestions = true;
//         this.videoRef.nativeElement.pause();
//         this.overlayRef.nativeElement.style.display = 'flex';
//         this.showQuestion(this.currentQuestionIndex);
//       }
//     });

//     this.videoRef.nativeElement.addEventListener('ended', () => {
//       this.showFinalResult();
//     });
//   }

//   startWithCamera(): void {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         this.cameraStream = stream;
//         this.startCameraTracking();
//         this.startVideo();
//       })
//       .catch(() => alert("Camera access denied or not available."));
//   }

//   startWithoutCamera(): void {
//     this.startVideo();
//   }

//   startVideo(): void {
//     this.introOverlayRef.nativeElement.classList.add('hidden');
//     this.videoRef.nativeElement.controls = true;
//     this.videoRef.nativeElement.play();
//   }

//   stopCamera(): void {
//     if (this.cameraStream) {
//       this.cameraStream.getTracks().forEach(track => track.stop());
//       this.cameraStream = null;
//     }
//     if (this.cameraInterval) {
//       clearInterval(this.cameraInterval);
//       this.cameraInterval = null;
//     }
//   }

//   startCameraTracking(): void {
//     const video = document.createElement("video");
//     video.style.display = "none";
//     document.body.appendChild(video);
//     video.srcObject = this.cameraStream!;
//     video.play();

//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d")!;

//     this.cameraInterval = setInterval(() => {
//       if (video.readyState === video.HAVE_ENOUGH_DATA) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob(blob => {
//           if (blob) {
//             const formData = new FormData();
//             formData.append("image", blob, "snapshot.jpg");
//             fetch("https://your-backend.com/api/track-player", {
//               method: "POST",
//               body: formData
//             }).catch(err => console.error("Failed to send image:", err));
//           }
//         }, "image/jpeg", 0.8);
//       }
//     }, 5000);
//   }

//   showQuestion(index: number): void {
//     const question = this.questions[index];
//     const content = this.questionBoxRef.nativeElement;
//     content.innerHTML = `<h2>${question.question}</h2>`;
//     this.questionAudio = new Audio(question.audio.questionAudio);
//     this.questionAudio.play();

//     question.choices.forEach(choice => {
//       const btn = document.createElement('button');
//       btn.innerHTML = `<img src="${choice.img}" alt="shape">`;
//       btn.onclick = () => this.handleAnswer(choice.isCorrect);
//       content.appendChild(btn);
//     });
//   }

//   handleAnswer(isCorrect: boolean): void {
//     const question = this.questions[this.currentQuestionIndex];
//     const feedbackAudio = new Audio(isCorrect ? question.audio.correctAudio : question.audio.wrongAudio);

//     if (this.questionAudio && !this.questionAudio.paused) {
//       this.questionAudio.pause();
//       this.questionAudio.currentTime = 0;
//     }

//     feedbackAudio.play();
//     if (isCorrect) this.correctAnswers++;

//     setTimeout(() => {
//       this.currentQuestionIndex++;
//       this.overlayRef.nativeElement.style.display = 'none';
//       this.pausedForQuestions = false;

//       if (this.currentQuestionIndex >= this.questions.length) {
//         this.showFinalResult();
//       } else {
//         this.videoRef.nativeElement.play();
//       }
//     }, isCorrect ? 1000 : 3000);
//   }

//   showFinalResult(): void {
//     this.congratsAnswersRef.nativeElement.textContent = this.correctAnswers.toString();
//     this.overAnswersRef.nativeElement.textContent = this.correctAnswers.toString();

//     if (this.correctAnswers >= 3) {
//       this.congratsOverlayRef.nativeElement.classList.remove('hidden');
//     } else {
//       this.overOverlayRef.nativeElement.classList.remove('hidden');
//     }
//   }

//   tryAgain(): void {
//     this.overOverlayRef.nativeElement.classList.add('hidden');
//     this.resetGame();
//   }

//   exit(): void {
//     this.stopCamera();
//     this.router.navigate(['/class']);
//   }

//   resetGame(): void {
//     this.correctAnswers = 0;
//     this.currentQuestionIndex = 0;
//     this.pausedForQuestions = false;

//     this.introOverlayRef.nativeElement.classList.remove('hidden');
//     this.congratsOverlayRef.nativeElement.classList.add('hidden');
//     this.overOverlayRef.nativeElement.classList.add('hidden');
//   }

//   ngOnDestroy(): void {
//     this.stopCamera();
//   }
// }
