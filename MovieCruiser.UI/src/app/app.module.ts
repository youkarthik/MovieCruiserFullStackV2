import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MovieModule } from './movie/movie.module'

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
  path: '',
  redirectTo: 'movies',
  pathMatch: 'full'
  }
]

@NgModule({
  imports:      [ BrowserModule, FormsModule, MatToolbarModule, MovieModule, MatButtonModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
