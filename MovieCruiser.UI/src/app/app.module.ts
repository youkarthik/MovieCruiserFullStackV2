import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MovieModule } from './movie/movie.module'
import { SearchboxComponent } from './searchbox/searchbox.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './authguard.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeaderComponent } from './header.component';
import { HomeLayoutComponent } from './_layouts/home-layout.component';
import { LoginLayoutComponent } from './_layouts/login-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [BrowserModule, FormsModule, MatToolbarModule, MovieModule, AuthenticationModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, RouterModule.forRoot(appRoutes)],
  providers: [AuthGuardService],
  declarations: [AppComponent, SearchboxComponent, HeaderComponent, HomeLayoutComponent, LoginLayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
