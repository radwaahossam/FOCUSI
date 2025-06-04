import { FlowbiteService } from './flowbite/flowbite.service';
import { Component } from '@angular/core';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LogoComponent } from "./shared/navbar/logo/logo.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { NavComponent } from "./shared/navbar/nav/nav.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',  
  imports: [RouterOutlet, LogoComponent, NavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('500ms ease', style({ opacity: 1 }))
      ]),
    ])
  ]
})

export class AppComponent {
  title = 'focusi';
  showNavBar = false;

  constructor(private FlowbiteService: FlowbiteService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.showNavBar = ['/main/child-profile', '/main/dashboard', '/main/class', '/main/task-manager'].includes(url);
      }
    });
  }

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
