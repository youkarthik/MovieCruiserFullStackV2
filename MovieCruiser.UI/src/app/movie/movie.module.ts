import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from './container/container.component';
import { MovieRouterModule } from './movie-router/movie-router.module';
import { MovieService } from './movie.service';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { SearchComponent } from './search/search.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommentdialogComponent } from './commentdialog/commentdialog.component';
import { TokenInterceptor } from './token-interceptor.service';
import { MovieHttpClient } from './moviehttpclient.service';

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
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [ContainerComponent, ThumbnailComponent, SearchComponent, CommentdialogComponent],
  providers: [MovieService, MovieHttpClient, 
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptor,
  //   multi: true
  // }
],
  entryComponents:[CommentdialogComponent]
})
export class MovieModule { }