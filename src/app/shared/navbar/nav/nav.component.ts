import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  private _authService = inject(AuthService)
  _router = inject(Router)

  isLoggedIn: any 

  constructor() {
  }

  ngOnInit(): void {
    this.checkLogginStatus()
    // this._authService.saveUser() ;

  }

  checkLogginStatus() {
  this._authService.userData.subscribe({
    next:(res) =>{
      this.isLoggedIn = res
    }
  })
  }

  signOut() {
    localStorage.removeItem("userToken")
    this._authService.userData.next(null)
    console.log("SIGNED OUT:", this._authService.userData.value);

    this._router.navigate(['/auth/login'])

  }

}
