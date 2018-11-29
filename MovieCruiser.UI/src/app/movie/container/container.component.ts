import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../movie';
//container component to show the list of movie thumbnails of watchlist as well as tmdb movies
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() movies: Array<Movie>;
  movieType: string;
  isWatchlist: boolean;
  constructor(private movieService: MovieService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.movies = [];
    this.route.data.subscribe(data => { this.movieType = data.movieType; this.isWatchlist = (this.movieType == "watchlist") });

  }

  ngOnInit() {
    this.load();
  }

  //load method based on the movie type will fetch the movie details from corresponding source
  load() {
    if (this.movieType) {
      if (this.movieType == "watchlist") {
        this.movieService.getWatchListMovies().subscribe((movies) => { this.movies = []; this.movies.push(...movies); },
          error => { this.snackBar.open(error, '', { duration: 5000 }); }
        );
      }
      else
        this.movieService.getMovies(this.movieType).subscribe((movies) => { this.movies = []; this.movies.push(...movies); },
          error => { this.snackBar.open(error, '', { duration: 5000 }); }

        );
    }
  }

  //eventhandler to refresh the screen
  reload(arg: any) {
    this.load();
  }

}