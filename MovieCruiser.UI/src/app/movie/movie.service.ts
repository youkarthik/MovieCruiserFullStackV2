import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'
import { Movie } from './Movie'


@Injectable()
export class MovieService {
  apiKey: string = '65d23c85df26295f74201c1a729f31d3';
  tmdbEndpoint: string = 'https://api.themoviedb.org/3/';
  searchEndpoint: string = 'https://api.themoviedb.org/3/search';
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  watchlistApiEndpoint: string = 'http://localhost:8089'
  constructor(private http: HttpClient) { }

  getMovies(type: string, pageNumer: number = 1): Observable<Array<Movie>> {
    if (type) {
      console.log('getmovies called')
      const endpoint = `${this.tmdbEndpoint}movie/${type}?api_key=${this.apiKey}&page=${pageNumer}`;
      return this.http.get(endpoint).pipe(retry(3), map(this.pickMovieResults), map(this.transformPosterPath.bind(this)));
    }

  }
  getWatchListMovies() : Observable<Array<Movie>>
  {
    console.log('getwatchlistcalled');
    const endpoint = `${this.watchlistApiEndpoint}/api/movie`;
    return this.http.get(endpoint).pipe(retry(3), map(this.transformPosterPath.bind(this)));
  }
  searchMovies(searchString: string): Observable<Array<Movie>> {
    const endpoint = `${this.searchEndpoint}/movie?api_key=${this.apiKey}&&language=en-US&page=1&include_adult=false&query=${searchString}`;
    if (searchString.length > 0) {
      return this.http.get(endpoint).pipe(
        retry(3),
        map(this.pickMovieResults),
        map(this.transformPosterPath.bind(this))
      );
    }
  }
  transformPosterPath(movies): Array<Movie> {
    return movies.map(movie => {
      movie.poster_path = `${this.imagePrefix}${movie.poster_path}`;
      return movie;

    })
  }

  pickMovieResults(response) {
    return response['results'];
  }


}