
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-feedback',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './feedback.component.html',
//   styleUrl: './feedback.component.css'
// })

// export class FeedbackComponent {

//   Feedback= {
//     ratings: {
//       understanding: 0,
//       suitability: 0,
//       clarity: 0
//     },
//     favoritePart: '',
//     continue: '',
//     improvement: '',
//     suggestions: '',
//     recommend: '',
//     comments: ''
//   };

//   showThankYouModal = false;

//   constructor(private http: HttpClient) {}

//   setRating(key: keyof typeof this.Feedback.ratings, value: number) {
//     this.Feedback.ratings[key] = value;
//   }
 

//   submitFeedback() {
//     this.http.post('https://your-api-endpoint.com/feedback', this.Feedback).subscribe({
//       next: () => {
//         this.showThankYouModal = true;
//         setTimeout(() => this.showThankYouModal = false, 4000); // auto-close modal after 4 sec
//       },
//       error: err => alert('Error: ' + err.message)
//     });
//   }

//   closeModal() {
//     this.showThankYouModal = false;
//   }
// }




// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-feedback',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './feedback.component.html',
//   styleUrls: ['./feedback.component.css']
// })
// export class FeedbackComponent {

//   Feedback = {
//     ratings: {
//       understanding: 0,
//       suitability: 0,
//       clarity: 0
//     },
//     favoritePart: '',
//     continue: '',
//     improvement: '',
//     suggestions: '',
//     recommend: '',
//     comments: '',
//   };

//   showThankYouModal = false;

//   constructor(private http: HttpClient) {}

//   setRating(key: keyof typeof this.Feedback.ratings, value: number) {
//     this.Feedback.ratings[key] = value;
//   }

//   // دالة للتحقق من أن جميع الأسئلة تم الإجابة عليها
//   isFormValid() {
//     // تحقق من كل الحقول
//     return this.Feedback.ratings.understanding > 0 &&
//       this.Feedback.ratings.suitability > 0 &&
//       this.Feedback.ratings.clarity > 0 &&
//       this.Feedback.favoritePart !== '' &&
//       this.Feedback.improvement !== '' &&
//       this.Feedback.continue !== '' &&
//       this.Feedback.recommend !== '';
//   }


//   updateCheckbox() {
//     // إدارة منطق اختيار الخيارات، إذا كنت تريد تمكين أكثر من اختيار أو منع اختيارات معينة.
//     console.log(this.Feedback.improvement); // طباعة البيانات
//   }

  
  

  // submitFeedback() {
  //   if (!this.isFormValid()) {
  //     alert("Please answer all the questions before submitting.");
  //     return;  // لا نكمل الإرسال إذا كانت البيانات غير مكتملة
  //   }

    // تم تعليق الجزء الخاص بالـ API بسبب مشكلة CORS
    // this.http.post('https://your-api-endpoint.com/feedback', this.Feedback).subscribe({
    //   next: () => {
    //     this.showThankYouModal = true;
    //     setTimeout(() => this.showThankYouModal = false, 4000); // auto-close modal after 4 sec
    //   },
    //   error: err => alert('Error: ' + err.message)
    // });

    // بمجرد حل مشكلة الـ CORS يمكنك إزالة تعليق الكود أعلاه
//     console.log("Feedback submitted:", this.Feedback); // طباعة البيانات في الـ Console أثناء الاختبار
//     this.showThankYouModal = true;
//     setTimeout(() => this.showThankYouModal = false, 6000); // auto-close modal after 4 sec
//   }

//   closeModal() {
//     this.showThankYouModal = false;
//   }
// }








import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  Feedback = {
    ratings: {
      understanding: 0,
      suitability: 0,
      clarity: 0
    },
    favoritePart: '',
    continue: '',
    improvement: '',
    suggestions: '',
    recommend: '',
    comments: ''
  };

  showThankYouModal = false;

  constructor(private http: HttpClient, private router: Router) {}

  setRating(key: keyof typeof this.Feedback.ratings, value: number) {
    this.Feedback.ratings[key] = value;
  }

  validateForm(): boolean {
    const { ratings, favoritePart, continue: cont, improvement, recommend } = this.Feedback;
    return (
      ratings.understanding > 0 &&
      ratings.suitability > 0 &&
      ratings.clarity > 0 &&
      favoritePart.trim() !== '' &&
      cont.trim() !== '' &&
      improvement.trim() !== '' &&
      recommend.trim() !== ''
    );
  }

  submitFeedback() {
    if (!this.validateForm()) {
      alert("Please answer all required questions before submitting.");
      return;
    }

    // مؤقتًا، طباعة للكونسول بدل من الـ API بسبب CORS
    console.log("Feedback submitted:", this.Feedback);
    this.showThankYouModal = true;
    setTimeout(() => this.showThankYouModal = false, 4000);
  }

  closeModal() {
    this.showThankYouModal = false;
    this.router.navigate([`/child-profile`])

  }
}
