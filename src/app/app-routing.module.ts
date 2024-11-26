import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { currentUserGuard } from './auth/guards/current-user.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [currentUserGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
