import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { ForgetPasswordService } from '../../services/forgetPassword/forget-password.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  loading: boolean = false;
  step: number = 0;
  token: string = '';

  constructor(
    private readonly forgetPasswordService: ForgetPasswordService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  resetPasswordForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      confirmPassword: new FormControl(null, Validators.required),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  submitForm1() {
    if (this.forgetPasswordForm.valid) {
      this.loading = true;
      this.forgetPasswordService
        .forgetPassword(this.forgetPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.step = 1;
            this.loading = false;
            console.log(res);
            this.token = res.token; // ← احفظ التوكن اللي رجع من الباك
            console.log('Token from backend:', this.token);
          },
          error: (err) => {
            this.loading = false;
          },
        });
    }
  }

  // submitForm2(){
  // if(this.resetPasswordForm.valid){
  //     this.loading= true;
  //     this.forgetPasswordService.resetPassword(this.resetPasswordForm.value).subscribe({
  //       next: (res) => {
  //         this.step = 2;
  //         this.loading = false;
  //         console.log(res);
  //         this.router.navigate([`/auth/login`]);
  //       },
  //       error :(err)=> {
  //         this.loading = false;
  //       },
  //     })
  //   }  }

  submitForm2() {
    const token =
      typeof this.token === 'string' ? this.token : this.token['token'];

    if (this.resetPasswordForm.valid && this.token) {
      this.loading = true;

      const formData = {
        email: this.resetPasswordForm.value.email,
        newPassword: this.resetPasswordForm.value.newPassword,
        confirmPassword: this.resetPasswordForm.value.confirmPassword,
        token: this.token,
      };

      this.forgetPasswordService.resetPassword(formData).subscribe({
        next: (res) => {
          console.log('Sending resetPassword data:', formData);

          this.step = 2;
          this.loading = false;
          console.log(res);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
    }
  }
}
