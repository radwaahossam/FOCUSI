
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-parent-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './parent-test.component.html',
  styleUrl: './parent-test.component.css',
  animations: [
    trigger('bounce', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('800ms cubic-bezier(.68,-0.55,.27,1.55)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ParentTestComponent {
  form: FormGroup;
  currentQuestionIndex = 0;

  questions = [
    "Has difficulty sustaining attention in tasks or play activities.",
    "Easily distracted by external stimuli.",
    "Does not seem to listen when spoken to directly.",
    "Does not follow through on instructions and fails to finish tasks.",
    "Has difficulty organizing tasks and activities.",
    "Loses things necessary for tasks or activities.",
    "Avoids or dislikes tasks that require sustained mental effort.",
    "Is forgetful in daily activities.",
    "Talks excessively.",
    "Has difficulty waiting for their turn.",
    "Interrupts or intrudes on others.",
    "Leaves seat in situations when remaining seated is expected.",
    "Runs about or climbs in situations where it is inappropriate.",
    "Is unable to play or engage in leisure activities quietly.",
    "Is always 'on the go' or acts as if 'driven by a motor'.",
    "Blurts out answers before questions have been completed.",
    "Has temper outbursts and mood swings.",
    "Displays aggressive or oppositional behavior.",
    "Shows excessive worry or fear.",
    "Cannot stay still, appears restless or hyperactive."
  ];

  options = [
    { label: 'All the time', value: 5 },
    { label: 'Often', value: 4 },
    { label: 'Sometimes', value: 3 },
    { label: 'Rarely', value: 2 },
    { label: 'Not Applied', value: 1 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      answers: this.fb.array(this.questions.map(() => this.fb.control(null, Validators.required)))
    });
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  get currentQuestion(): string {
    return this.questions[this.currentQuestionIndex];
  }

  get currentAnswerControl() {
    return this.answers.at(this.currentQuestionIndex);
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  onSelectAnswer(value: number) {
    this.currentAnswerControl.setValue(value);
  }

  nextQuestion() {
    if (this.currentAnswerControl.valid && this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

onSubmit() {
  if (this.answers.length === this.questions.length && this.form.valid) {
    const payload = this.answers.value;

    this.http.put('https://focusi.runasp.net/api/Tests/ParentsTest', payload, {
      responseType: 'text'
    }).subscribe({
      next: (res) => {
        console.log('Response from backend:', res); 
        localStorage.setItem('isParentTestDone', 'true');
        this.router.navigate(['/test-choose']);
      },
      error: (err) => {
        console.error('Error sending data:', err);
        alert('Something went wrong while sending the answers.');
      }
    });
  } else {
    alert('Please answer all the questions.');
  }
}


}
