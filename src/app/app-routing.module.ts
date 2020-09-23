import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeMainComponent } from './home/layout/home-main/home-main.component';
import { CovidComponent } from './home/covid/covid.component';
import { TintucComponent } from './home/tintuc/tintuc.component';


import { MainComponent } from './admin/layout/main/main.component';
import { LoginComponent } from './admin/login/login.component';
import { PostComponent } from './admin/post/post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMainComponent,
    children: [
      {
        path: '',
        component: CovidComponent
      },
      {
        path: 'tintuc',
        component: TintucComponent
      }
    ]
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: 'post',
        component: PostComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
