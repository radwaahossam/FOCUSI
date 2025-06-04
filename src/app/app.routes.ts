import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layout/layout/main-layout/main-layout.component';

export const routes: Routes = [
    {path:"auth", component:AuthLayoutComponent, children:[
        {path:"", loadComponent:()=> import('./core/pages/register/register.component').then(c=> c.RegisterComponent)},
        {path:"login", loadComponent:()=> import('./core/pages/login/login.component').then(c=> c.LoginComponent)},
        {path:"forget-password", loadComponent:()=> import('./core/pages/forget-password/forget-password.component').then(c=> c.ForgetPasswordComponent)},
    ]},

    {path:"main", component:MainLayoutComponent, children:[
        {path:"class", loadComponent:()=> import('./core/pages/class/class.component').then(c=> c.ClassComponent)},
        {path:"task-manager", loadComponent:()=> import('./core/pages/full-task-manager/full-task-manager.component').then(c=> c.FullTaskManagerComponent)},
        {path:"dashboard", loadComponent:()=> import('./core/pages/dash-board/dash-board.component').then(c=> c.DashBoardComponent)},
        {path:"child-profile", loadComponent:()=> import('./core/pages/child-profile/child-profile.component').then(c=> c.ChildProfileComponent)},
    ] 
    },

    {path:"parent-test", loadComponent:()=> import('./features/pages/parent-test/parent-test.component').then(c=> c.ParentTestComponent)},
    {path:"child-test", loadComponent:()=> import('./features/pages/child-test-game/child-test-game.component').then(c=> c.ChildTestGameComponent)},
    {path:"video-test", loadComponent:()=> import('./features/pages/video-test/video-test.component').then(c=> c.VideoTestComponent)},
    {path:"feedback", loadComponent:()=> import('./core/pages/feedback/feedback.component').then(c=> c.FeedbackComponent)},

    {path:"", loadComponent:()=> import('./core/pages/login/login.component').then(c=> c.LoginComponent)},

    {path:"**", loadComponent:()=> import('./core/pages/not-found/not-found.component').then(c=> c.NotFoundComponent )},

];
