import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detaildialog',
  templateUrl: './detaildialog.component.html',
  styleUrls: ['./detaildialog.component.css']
})
export class DetaildialogComponent implements OnInit {
  movie: Movie;
  constructor(public dialogRef: MatDialogRef<DetaildialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private movieService: MovieService, private snackBar: MatSnackBar) {
    this.movie = data.obj;
  }

  ngOnInit() {
    this.load();
  }
  onCancel() {
    this.dialogRef.close();
  }

  onAddWatchlist() {
    this.movieService.addWatchlistMovie(this.movie).subscribe(
      () => { this.snackBar.open('Movie added to Watchlist', '', { duration: 5000 }); this.load();  },
      error => { this.snackBar.open(error, '', { duration: 5000 }); }
    );
  }
  onRemoveWatchlist() {
    this.movieService.deleteWatchlistMovie(this.movie.id).subscribe(
      () => { this.snackBar.open('Movie deleted from Watchlist', '', { duration: 5000 }); this.load();  },
      error => { this.snackBar.open(error, '', { duration: 5000 }); }
    );
  }

  load()
  {
    this.movieService.getWatchlistMovie(this.movie.id).subscribe((movie) => { this.movie.comments = movie.comments; this.movie.isInWatchlist = true; },
        () => { this.movie.comments = ''; this.movie.isInWatchlist = false; });
  };

}
