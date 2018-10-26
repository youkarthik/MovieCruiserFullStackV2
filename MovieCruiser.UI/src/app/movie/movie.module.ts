import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from './container/container.component';
import { MovieRouterModule } from './movie-router/movie-router.module';
import { MovieService } from './movie.service';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    MovieRouterModule,
    CommonModule, 
    MatCardModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [ContainerComponent, ThumbnailComponent],
  providers: [MovieService]
})
export class MovieModule { }