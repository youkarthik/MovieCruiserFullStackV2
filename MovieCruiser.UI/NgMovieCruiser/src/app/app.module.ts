import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieThumbnailComponent } from './movie-thumbnail/movie-thumbnail.component';
import { MovieListComponent } from './movie-list/movie-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieThumbnailComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
