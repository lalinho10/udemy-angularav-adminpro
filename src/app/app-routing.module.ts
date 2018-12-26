import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PageNotFountComponent } from './shared/page-not-fount/page-not-fount.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFountComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot( APP_ROUTES ) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
