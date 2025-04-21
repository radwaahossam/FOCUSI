


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Router, RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-parent-test',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, RouterModule],
//   templateUrl: './parent-test.component.html',
//   styleUrl: './parent-test.component.css'
// })
// export class ParentTestComponent {
//   form: FormGroup;
//   currentPage = 1;

//   // _router = inject (Router)


//   questions = [
//     "Has difficulty sustaining attention in tasks or play activities.",
//     "Easily distracted by external stimuli.",
//     "Does not seem to listen when spoken to directly.",
//     "Does not follow through on instructions and fails to finish tasks.",
//     "Has difficulty organizing tasks and activities.",
//     "Loses things necessary for tasks or activities (e.g., toys, school assignments, pencils).",
//     "Avoids or dislikes tasks that require sustained mental effort.",
//     "Is forgetful in daily activities.",
//     "Talks excessively.",
//     "Has difficulty waiting for their turn.",
//     "Interrupts or intrudes on others (e.g., butts into conversations or games).",
//     "Leaves seat in situations when remaining seated is expected.",
//     "Runs about or climbs in situations where it is inappropriate.",
//     "Is unable to play or engage in leisure activities quietly.",
//     "Is always 'on the go' or acts as if 'driven by a motor'.",
//     "Blurts out answers before questions have been completed.",
//     "Has temper outbursts and mood swings.",
//     "Displays aggressive or oppositional behavior.",
//     "Shows excessive worry or fear.",
//     "Cannot stay still, appears restless or hyperactive."
//   ];

//   options = [
//     { label: 'All the time', value: 5 },
//     { label: 'Often', value: 4 },
//     { label: 'Sometimes', value: 3 },
//     { label: 'Rarely', value: 2 },
//     { label: 'Not Applied', value: 1 }
//   ];

//   constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
//     this.form = this.fb.group({
//       answers: this.fb.array(this.questions.map(() =>
//         this.fb.group({
//           answer: [null, Validators.required]
//         })
//       ))
//     });
//   }
  

//   get answers(): FormArray {
//     return this.form.get('answers') as FormArray;
//   }

//   trackByIndex(index: number, item: any): number {
//     return index;
//   }

//   nextPage() {
//     if (this.currentPage < Math.ceil(this.questions.length / 10)) {
//       this.currentPage++;
//     }
//   }
  

//   prevPage() {
//     if (this.currentPage > 1) this.currentPage--;
//   }

//   // onSubmit() {
//   //   if (this.form.valid) {
//   //     const result = this.answers.controls.map(control => control.value.answer);
  
//   //     // إرسال الإجابات إلى الباكيند
//   //     this.http.post('/api/submit-parent-test', { answers: result }).subscribe({
//   //       next: (res) => {
//   //         console.log(res)
//   //         // لو تم الإرسال بنجاح ننتقل لصفحة child-test
//   //         this.router.navigate(['/child-test']);
//   //       },
//   //       error: (err) => {
//   //         console.error('Error submitting answers:', err);
//   //         alert('Something went wrong. Please try again.');
//   //       }
//   //     });
//   //   } else {
//   //     alert('Please answer all questions.');
//   //   }
//   // }
  

//   onSubmit() {
//     console.log('Form status:', this.form.status);
//     console.log('Form values:', this.form.value);
//     console.log('Invalid controls:');
//     this.answers.controls.forEach((control, index) => {
//       if (control.invalid) {
//         console.log(`Question ${index + 1} is invalid`);
//       }
//     });
  
//     if (this.form.valid) {
//       const result = this.form.value.answers;
//       console.log('Final submitted answers:', result);
//       this.router.navigate(['/child-test']);
//     } else {
//       alert('Please answer all questions.');
//     }
//   }
  
// }




import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-parent-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './parent-test.component.html',
  styleUrls: ['./parent-test.component.css']
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
    if (this.answers.length === this.questions.length) {
      console.log('Sending to backend:', this.answers);
  
      // هنا تبعتي الإجابات للباك اند – ممكن تستخدم HttpClient
      // this.http.post('api/parent-answers', { answers: this.answers }).subscribe(...)
  
      // وبعد كده نروح لصفحة child-test
      this.router.navigate(['/child-test']);
    } else {
      alert('Please answer all the questions.');
    }
  }
}
