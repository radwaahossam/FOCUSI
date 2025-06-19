import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layout/layout/main-layout/main-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    
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
    {path:"videos", loadComponent:()=> import('./features/pages/video-activity/video-activity.component').then(c=> c.VideoActivityComponent)},
    {path:"games", loadComponent:()=> import('./features/pages/game-activity/game-activity.component').then(c=> c.GameActivityComponent)},
    {path:"test-choose", loadComponent:()=> import('./core/pages/test-choose/test-choose.component').then(c=> c.TestChooseComponent)},
    {path:"feedback", loadComponent:()=> import('./core/pages/feedback/feedback.component').then(c=> c.FeedbackComponent)},
    {path:"reports", loadComponent:()=> import('./core/pages/reports/reports.component').then(c=> c.ReportsComponent)},
    {path:"advices", loadComponent:()=> import('./core/pages/advices/advices.component').then(c=> c.AdvicesComponent)},
    {path:"stories", loadComponent:()=> import('./core/pages/stories/stories.component').then(c=> c.StoriesComponent)},

    {path:"**", loadComponent:()=> import('./core/pages/not-found/not-found.component').then(c=> c.NotFoundComponent )},
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },


];
