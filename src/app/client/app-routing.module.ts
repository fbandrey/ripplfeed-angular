import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- Components ---
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigninComponent } from './components/signin/signin.component';
import { FooComponent } from './components/foo/foo.component';
import { FeedComponent } from './components/feed/feed.component';
import { SettingsComponent } from './components/settings/settings.component';

import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'new',
    component: FooComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const AppRoutingComponents = [
  DashboardComponent,
  SigninComponent,
  SignupComponent,
  FooComponent,
  FeedComponent,
  SettingsComponent
];
