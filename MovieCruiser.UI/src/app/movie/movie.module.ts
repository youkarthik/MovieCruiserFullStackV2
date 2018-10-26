import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from './container/container.component';
import { MovieRouterModule } from './movie-router/movie-router.module';
import { MovieService } from './movie.service';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './search/search.component';

import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MovieRouterModule,
    CommonModule, 
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [ContainerComponent, ThumbnailComponent, SearchComponent],
  providers: [MovieService]
})
export class MovieModule { }