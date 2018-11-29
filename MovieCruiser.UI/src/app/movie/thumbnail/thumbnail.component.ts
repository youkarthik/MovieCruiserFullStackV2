import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommentdialogComponent } from '../commentdialog/commentdialog.component';
import { DetaildialogComponent } from '../detaildialog/detaildialog.component';

//thumbnail component to display a single movie summary details
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

  //add button event handler, not used  and replaced by view button
  onAdd()
  {
      this.movieService.getWatchlistMovie(this.movie.id).subscribe((movie) => this.snackBar.open("Movie already in watchlist", '', { duration: 5000 }),
      () => this.add());
    
  }

  //view button event handler
  onView()
  {
    let dialogRef = this.matDlg.open(DetaildialogComponent,
      {
        data: {obj: this.movie}
      });
    
  }

  //add to watchlist method works based on dialog input
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

 
//update watchlist comment button click handler
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

  //remove from watchlist button event handler
  onRemove()
  {
    this.movieService.deleteWatchlistMovie(this.movie.id).subscribe(
      () =>{ this.refreshMovieList.emit(null); this.snackBar.open('Movie deleted from Watchlist', '', { duration: 5000 })},
      error => {  this.snackBar.open(error, '', { duration: 5000 }); }
    );
  }

}