import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommentdialogComponent } from './commentdialog/commentdialog.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MovieRouterModule,
    CommonModule, 
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [ContainerComponent, ThumbnailComponent, SearchComponent, CommentdialogComponent],
  providers: [MovieService]
})
export class MovieModule { }