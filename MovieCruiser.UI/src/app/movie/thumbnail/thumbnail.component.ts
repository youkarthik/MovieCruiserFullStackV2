import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommentdialogComponent } from '../commentdialog/commentdialog.component';
import { DetaildialogComponent } from '../detaildialog/detaildialog.component';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input() movie: Movie;
  @Input() isWatchlist: boolean;
  @Output() refreshMovieList = new EventEmitter();
  
  constructor(private movieService: MovieService, private snackBar: MatSnackBar, private matDlg: MatDialog) { }

  ngOnInit() {
  }

  onAdd()
  {
      this.movieService.getWatchlistMovie(this.movie.id).subscribe((movie) => this.snackBar.open("Movie already in watchlist", '', { duration: 5000 }),
      () => this.add());
    
  }

  onView()
  {
    let dialogRef = this.matDlg.open(DetaildialogComponent,
      {
        data: {obj: this.movie}
      });
    
  }

  add()
  {
    
    let dialogRef = this.matDlg.open(CommentdialogComponent,
      {
        data: {obj: this.movie}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.movie.comments = result;
          this.movieService.addWatchlistMovie(this.movie).subscribe(
            () =>{ this.snackBar.open('Movie added to Watchlist', '', { duration: 5000 })},
            error => {  this.snackBar.open(error, '', { duration: 5000 }); }
          );
        }
      }); 
  }

 

  onUpdate()
  {
    let dialogRef = this.matDlg.open(CommentdialogComponent,
      {
        //width:"400px",
        data: {obj: this.movie}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.movieService.updateWatchlistMovieComments(this.movie.id, result).subscribe(
            () =>{ this.refreshMovieList.emit(null); this.snackBar.open('Watchlist movie comments updated', '', { duration: 5000 })},
            error => {  this.snackBar.open(error, '', { duration: 5000 }); }
          )
        }
      });
  }

  onRemove()
  {
    this.movieService.deleteWatchlistMovie(this.movie.id).subscribe(
      () =>{ this.refreshMovieList.emit(null); this.snackBar.open('Movie deleted from Watchlist', '', { duration: 5000 })},
      error => {  this.snackBar.open(error, '', { duration: 5000 }); }
    );
  }

}