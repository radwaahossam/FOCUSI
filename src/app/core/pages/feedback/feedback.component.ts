
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

  // submitFeedback() {
  //   if (!this.validateForm()) {
  //     alert("Please answer all required questions before submitting.");
  //     return;
  //   }

  //   // مؤقتًا، طباعة للكونسول بدل من الـ API بسبب CORS
  //   console.log("Feedback submitted:", this.Feedback);
  //   this.showThankYouModal = true;
  //   setTimeout(() => this.showThankYouModal = false, 4000);
  // }

  submitFeedback() {
  if (!this.validateForm()) {
    alert("Please answer all required questions before submitting.");
    return;
  }

  const requestBody = {
    q1Answer: this.Feedback.ratings.understanding,
    q2Answer: this.Feedback.ratings.suitability,
    q3Answer: this.Feedback.ratings.clarity,
    q4Answer: this.Feedback.favoritePart,
    q5Answer: this.Feedback.continue,
    q6Answer: this.Feedback.improvement,
    q7Answer: this.Feedback.recommend,
    suggestions: this.Feedback.suggestions || ''
  };

  this.http.post('http://focusi.runasp.net/api/Feedback', requestBody,  { responseType: 'text' } ).subscribe({
    next: (response) => {
      console.log('Feedback submitted successfully', response);
      this.showThankYouModal = true;
    },
    error: (error) => {
      console.error('Error submitting feedback', error);
      alert('There was an error submitting your feedback. Please try again.');
    }
  });
}

  closeModal() {
    this.showThankYouModal = false;
    this.router.navigate([`/main/child-profile`])

  }
}
