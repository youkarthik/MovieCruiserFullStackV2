import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: Array<Movie>;
  searchText: string;
  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    this.movies = [];
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.searchText = params['q'];
        if (this.searchText != null && this.searchText.length > 0) {
          this.movieService.searchMovies(this.searchText).subscribe(response => {
            this.movies = response;
          });
        }
        else
        {
          this.movies = [];
        }
      });
  }


}
