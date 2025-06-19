import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChildServiceService } from '../../../core/services/child-service.service';
import { ChangeDetectorRef } from '@angular/core'; 


@Component({
  selector: 'app-interactive-video',
  imports: [ CommonModule ],
  templateUrl: './video-test.component.html',
  styleUrls: ['./video-test.component.css'],
})
export class VideoTestComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('cameraFeed') cameraFeed!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router, private httpClient: HttpClient,  private childService: ChildServiceService, private cdr: ChangeDetectorRef){}

 ngOnInit(): void {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
  }
}

cameraInterval: any = null;
truePhotoCount: number = 0;
totalPhotosSent: number = 0;
totalPhotos = 0;
truePhotos = 0;


  childData: any;
  showClassModal = false;

  showIntroOverlay = true;
  videoStarted = false;
  cameraEnabled = false;
  currentQuestionIndex = 0;
  currentQuestion: any = null;
  showQuestionOverlay = false;
  correctAnswers = 0;
  pausedForQuestions = false;

 startWithoutCamera() {
  this.showIntroOverlay = false;
  this.videoStarted = true;

  setTimeout(() => {
    this.playVideo(); 
  }, 100);
}

  startWithCamera() {
  console.log("startWithCamera called");
  this.showIntroOverlay = false;
  this.videoStarted = true;
  this.cameraEnabled = true;

  setTimeout(() => {
    this.playVideo();
    this.startCamera();
  }, 100);
}


  questions = [
    {
        type: 'image-choice',
        question: "Which shape is round like an egg?",
        audio: {
            questionAudio: 'assets/video-test/B1/audios/question1.mp3',  
            correctAudio: 'assets/video-test/B1/audios/correct.mp3',   
            wrongAudio: 'assets/video-test/B1/audios/wrong1.mp3'      
        },
        choices: [
            { img: 'assets/video-test/B1/images/circle.png', isCorrect: false },
            { img: 'assets/video-test/B1/images/oval.png', isCorrect: true }
        ]
    },
    {
        type: 'image-choice',
        question: "Which shape is perfectly round?",
        audio: {
            questionAudio: 'assets/video-test/B1/audios/question2.mp3',  
            correctAudio: 'assets/video-test/B1/audios/correct.mp3',   
            wrongAudio: 'assets/video-test/B1/audios/wrong2.mp3'      
        },
        choices: [
            { img: 'assets/video-test/B1/images/circle.png', isCorrect: true },
            { img: 'assets/video-test/B1/images/oval.png', isCorrect: false }
        ]
    },
    {
        type: 'image-choice',
        question: "Which shape has four equal sides?",
        audio: {
            questionAudio: 'assets/video-test/B1/audios/question3.mp3',  
            correctAudio: 'assets/video-test/B1/audios/correct.mp3',   
            wrongAudio: 'assets/video-test/B1/audios/wrong3.mp3'      
        },
        choices: [
            { img: 'assets/video-test/B1/images/rectangle.png', isCorrect: false },
            { img: 'assets/video-test/B1/images/square.png', isCorrect: true }
        ]
    },
    {
        type: 'image-choice',
        question: "Which shape is lined has four sides?",
        audio: {
            questionAudio: 'assets/video-test/B1/audios/question4.mp3',  
            correctAudio: 'assets/video-test/B1/audios/correct.mp3',   
            wrongAudio: 'assets/video-test/B1/audios/wrong4.mp3'      
        },
        choices: [
            { img: 'assets/video-test/B1/images/rectangle.png', isCorrect: true },
            { img: 'assets/video-test/B1/images/square.png', isCorrect: false }
        ]
    },
    {
        type: 'image-choice',
        question: "Which shape has five points?",
        audio: {
            questionAudio: 'assets/video-test/B1/audios/question5.mp3',  
            correctAudio: 'assets/video-test/B1/audios/correct.mp3',   
            wrongAudio: 'assets/video-test/B1/audios/wrong5.mp3'      
        },
        choices: [
            { img: 'assets/video-test/B1/images/rectangle.png', isCorrect: false },
            { img: 'assets/video-test/B1/images/star.png', isCorrect: true },
            { img: 'assets/video-test/B1/images/oval.png', isCorrect: false }
        ]
    }
];


  playVideo() {
  const video = this.videoPlayer.nativeElement;
  video.controls = true;
  video.play();

  video.ontimeupdate = () => {

  if (!this.pausedForQuestions && this.currentQuestionIndex === 0 && video.currentTime >= 25.5) {
    this.pausedForQuestions = true;
    video.pause();
    this.showQuestionOverlay = true;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.playAudio(this.currentQuestion.audio.questionAudio);
  }
};

  video.onended = () => {
  if (this.currentQuestionIndex >= 2 && this.currentQuestionIndex < this.questions.length) {
    this.showNextQuestion();
  }
};

}

  startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      this.cameraFeed.nativeElement.srcObject = stream;
      this.startCameraTracking(stream);
    })
    .catch(err => {
      console.error('Camera access denied:', err);
    });
}

  showNextQuestion() {
  this.showQuestionOverlay = true;
  this.currentQuestion = this.questions[this.currentQuestionIndex];
  this.playAudio(this.currentQuestion.audio.questionAudio);
}


handleAnswer(choice: any) {
  const isCorrect = choice.isCorrect;
  const audioSrc = isCorrect
    ? this.currentQuestion.audio.correctAudio
    : this.currentQuestion.audio.wrongAudio;


  new Audio(audioSrc).play();

  if (isCorrect) this.correctAnswers++;
  const delay = isCorrect ? 1000 : 3000;

  setTimeout(() => {
    this.showQuestionOverlay = false;
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === 1) {
      this.showNextQuestion();
    }
    else if (this.currentQuestionIndex === 2) {
        this.showQuestionOverlay = false;
        this.videoPlayer.nativeElement.play(); 
    } 
    else if (this.currentQuestionIndex < this.questions.length) {
      this.showNextQuestion(); 
    }
    else {
      console.log("Showing final overlay...");
      this.showFinalOverlay();
    }
  }, delay);
}

handleExit() {
  document.querySelector('.congrats-overlay')?.classList.add('hidden');
  document.querySelector('.over-overlay')?.classList.add('hidden');
  const video = this.videoPlayer.nativeElement;
  if (!video.ended || this.currentQuestionIndex < this.questions.length) {
    alert("Please complete the video and questions first.");
    return;
  }

  this.stopCamera();
  localStorage.setItem('isVideoTestDone', 'true');
 this.checkAndShowClass();
}

stopCamera() {
  if (this.cameraFeed?.nativeElement?.srcObject) {
    const stream = this.cameraFeed.nativeElement.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    this.cameraFeed.nativeElement.srcObject = null;
  }

  if (this.cameraInterval) {
    clearInterval(this.cameraInterval);
    this.cameraInterval = null;
  }
}

startCameraTracking(stream: MediaStream) {
  const video = document.createElement("video");
  video.style.display = "none";
  document.body.appendChild(video);
  video.srcObject = stream;
  video.play();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  this.totalPhotos = 0;
  this.truePhotos = 0;

  this.cameraInterval = setInterval(() => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (blob) {
          const formData = new FormData();
          formData.append("image", blob, "snapshot.jpg");

          this.totalPhotos++;

          fetch("https://amira44-newfocus.hf.space/predict", {
            method: "POST",
            body: formData
          })
          .then(res => res.json())
          .then(result => {
            if (result.isFocused === true) {
              this.truePhotos++;
            }
          })
          .catch(err => {
            console.error("Failed to send image or parse result:", err);
          });
        }
      }, "image/jpeg", 0.8);
    }
  }, 1000);
}




playAudio(src: string) {
  const audio = new Audio(src);
  audio.play();
}

showFinalOverlay() {
  const pass = this.correctAnswers >= 3;

  const overlay = document.querySelector(pass ? '.congrats-overlay' : '.over-overlay') as HTMLElement;
  overlay.classList.remove('hidden');

  const answerSpans = document.querySelectorAll('#correct-answers');
  answerSpans.forEach(span => {
    span.textContent = this.correctAnswers.toString();
  });

  const payload = {
    correctAnswers: this.correctAnswers,
    questionsNum: this.questions.length,
    totalPhotos: this.totalPhotos,
    truePhotos: this.truePhotos
  };

this.httpClient.put('https://focusi.runasp.net/api/Tests/videoTest', payload, {
  responseType: 'text'
})
.subscribe({
  next: (res) => {
    console.log("✅ Data successfully sent to API:", res);
      localStorage.setItem('isVideoTestDone', 'true');
  },
  error: (err) => {
    console.error("❌ Failed to send API data:", err);
  }
});

  document.dispatchEvent(new Event('finishVideoTest'));
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
