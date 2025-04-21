import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  apiError!: string 
  isCallingApi: boolean = false
  subscription :Subscription = new Subscription()
  loginForm! : FormGroup

  _authService = inject (AuthService)
  _router = inject (Router)

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.loginForm = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{5,}$/)]),
    },
  );
  }

  login(){
    console.log(this.loginForm);
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }else{
      this.apiError= ''
      this.isCallingApi = true
      if(this.subscription) this.subscription.unsubscribe()
        this.subscription = this._authService.loginUser(this.loginForm.value).subscribe({
        next:(res) => {
          console.log(res)
          this.isCallingApi= false
          this._router.navigate(['/parent-test'])
        },
        error:(err) => {
          console.log(err)
          this.apiError = err.error.message
          this.isCallingApi= false
        },
        complete() {
         },
      })
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
