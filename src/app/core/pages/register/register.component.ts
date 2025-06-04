import { Component, inject, OnDestroy } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { CommonModule } from '@angular/common';
import { ChildServiceService } from '../../services/child-service.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnDestroy {

  apiError!: string
  isCallingApi: boolean = false
  subscription: Subscription = new Subscription()

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(3), Validators.max(18), Validators.pattern('^[0-9]+$')]),
    gender: new FormControl(null, [Validators.required]),
  }, this.validateRePassword)

  _authService = inject(AuthService)
  _router = inject(Router)
  _childService = inject(ChildServiceService)


  register() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
  } else {
    this.apiError = '';
    this.isCallingApi = true;
    if (this.subscription) this.subscription.unsubscribe();

    this.subscription = this._authService.registerUser(this.registerForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._authService.saveUser();
        this._router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Full error response:', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors:', err.error.errors);
        }
        this.apiError = err.error?.errorMessage || err.error?.message || "حدث خطأ";
        this.isCallingApi = false;
      }
    });
  }
}

  validateRePassword(form: AbstractControl) {
    const password = form.get('password')?.value
    const confirmPassword = form.get('confirmPassword')?.value
    return password === confirmPassword ? null : { misMatch: true }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
