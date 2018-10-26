import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule,  MatInputModule } from '@angular/material';
import { MovieModule } from './movie/movie.module'
import { SearchboxComponent } from './searchbox/searchbox.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
  path: '',
  redirectTo: 'movies',
  pathMatch: 'full'
  }
]

@NgModule({
  imports:      [ BrowserModule, FormsModule, MatToolbarModule, MovieModule, MatButtonModule, MatIconModule, MatFormFieldModule,  MatInputModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, SearchboxComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
