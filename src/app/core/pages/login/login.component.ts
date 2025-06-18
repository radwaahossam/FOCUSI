import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private _http: HttpClient, private router: Router) {}


  apiError!: string 
  isCallingApi: boolean = false
  subscription :Subscription = new Subscription()
  loginForm! : FormGroup

  _authService = inject (AuthService)
  _router = inject (Router)
  _httpClient = inject(HttpClient);



  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.loginForm = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    },
  );
  }


login() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isCallingApi = true;
  this.apiError = '';

  this._authService.loginUser(this.loginForm.value).subscribe({
    next: (res) => {
      localStorage.setItem('userToken', res.token);

      this._httpClient.get('https://focusi.runasp.net/api/Tests', { responseType: 'text' }).subscribe({
        next: (responseText) => {
          console.log(responseText);
          if (responseText?.includes('Access to Test')) {
            this._router.navigate(['/parent-test']);
          } else {
            this._router.navigate(['/main/class']);
          }
        },
        error: (err) => {
          console.error(err);
          if (err.status === 403) {
            this._router.navigate(['/main/class']);
          } else {
            this.apiError = 'Something went wrong';
          }
        }
      });
    },
    error: (err) => {
      console.error(err);
      this.apiError = err.error?.errorMessage || err.error?.message || 'Something went wrong';
      this.isCallingApi = false;
    }
  });
}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
