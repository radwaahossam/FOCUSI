import { Component, inject, OnDestroy } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

// export class RegisterComponent implements OnDestroy {

//   apiError!: string 
//   isCallingApi: boolean = false
//   subscription :Subscription = new Subscription()
//   registerForm : FormGroup = new FormGroup({
//     name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
//     email : new FormControl(null, [Validators.required, Validators.email]),
//     password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{5,}$/)]),
//     rePassword : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{5,}$/)]),
//     childAge : new FormControl(null, [Validators.required,Validators.min(3),Validators.max(18),Validators.pattern('^[0-9]+$')]),
//     gender : new FormControl(null, [Validators.required]),

//   },
//   this.validateRePassword
// );

//   _authService = inject (AuthService)
//   _router = inject (Router)

//   register(){
//     console.log(this.registerForm);
//     if(this.registerForm.invalid){
//       this.registerForm.markAllAsTouched()
//     }else{
//       this.apiError= ''
//       this.isCallingApi = true
//       if(this.subscription) this.subscription.unsubscribe()
        
//         this.subscription = this._authService.registerUser(this.registerForm.value).subscribe({
//         next:(res) => {
//           console.log('register tmam', res);
//           const profileData = {
//             name: this.registerForm.value.name,
//             email: this.registerForm.value.email,
//             gender: this.registerForm.value.gender,
//             age: this.registerForm.value.childAge,
//             createdAt: new Date().toISOString(),
//             assignedClass: 'Not assigned yet',
//             score: 0,
//             photoUrl: null
//           };
      
//           localStorage.setItem('childProfile', JSON.stringify(profileData));
//           this.isCallingApi= false
//           this._router.navigate(['/auth/login'])
//         },
//         error:(err) => {
//           console.log(err)
//           this.apiError = err.error.message
//           this.isCallingApi= false
//         },
//         complete() {
//          },
//       })
//     }
//   }

//   validateRePassword(form: AbstractControl){
//     const password = form.get('password')?.value
//     const rePassword = form.get('rePassword')?.value
//     if(password== rePassword){
//       return null
//     }else{
//       return{misMatch: true}
//     }
//   }


//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

// }







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

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
    } else {
      this.apiError = ''
      this.isCallingApi = true
      if (this.subscription) this.subscription.unsubscribe()

      this.subscription = this._authService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          const profileData = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            gender: this.registerForm.value.gender,
            age: this.registerForm.value.age,
            createdAt: new Date().toISOString(),
            assignedClass: 'Not assigned yet',
            score: 0,
            photoUrl: null
          };

          localStorage.setItem('childProfile', JSON.stringify(profileData));
          this.isCallingApi = false
          this._router.navigate(['/auth/login'])
        },
        error: (err) => {
   console.error('Full error response:', err);
    if (err.error && err.error.errors) {
      console.error('Validation errors:', err.error.errors);
    }          this.apiError =  err.error.errorMessage || err.error.message || "حدث خطأ";
          this.isCallingApi = false
        }
      })
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
