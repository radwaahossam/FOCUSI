import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';

export const routes: Routes = [
    {path:"auth", component:AuthLayoutComponent, children:[
        {path:"", loadComponent:()=> import('./core/pages/register/register.component').then(c=> c.RegisterComponent)},
        {path:"login", loadComponent:()=> import('./core/pages/login/login.component').then(c=> c.LoginComponent)},
        {path:"forget-password", loadComponent:()=> import('./core/pages/forget-password/forget-password.component').then(c=> c.ForgetPasswordComponent)},
    ]},
    {path:"parent-test", loadComponent:()=> import('./features/pages/parent-test/parent-test.component').then(c=> c.ParentTestComponent)},
    {path:"child-test", loadComponent:()=> import('./features/pages/child-test-game/child-test-game.component').then(c=> c.ChildTestGameComponent)},

    {path:"", loadComponent:()=> import('./core/pages/login/login.component').then(c=> c.LoginComponent)},

    {path:"**", loadComponent:()=> import('./core/pages/not-found/not-found.component').then(c=> c.NotFoundComponent )},

];
