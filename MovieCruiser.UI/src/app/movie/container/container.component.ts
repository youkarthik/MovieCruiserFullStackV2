import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() movies: Array<Movie>;
  movieType: string;
  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    this.movies = [];
    this.route.data.subscribe(data => { this.movieType = data.movieType });

  }

  ngOnInit() {
    if (this.movieType) {
      console.log(this.movieType);
      if (this.movieType == "watchlist")
      {
        this.movieService.getWatchListMovies().subscribe((movies) => { this.movies.push(...movies); console.log(this.movies); });
      }
      else
      this.movieService.getMovies(this.movieType).subscribe((movies) => { this.movies.push(...movies); console.log(this.movies); });
    }
  }

}