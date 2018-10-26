import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'
import { Movie } from './Movie'


@Injectable()
export class MovieService {
  apiKey: string = '65d23c85df26295f74201c1a729f31d3';
  tmdbEndpoint: string = 'https://api.themoviedb.org/3/';
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  constructor(private http: HttpClient) { }

  getMovies(type: string,pageNumer: number = 1): Observable<Array<Movie>>
  {
    const endpoint = `${this.tmdbEndpoint}movie/${type}?api_key=${this.apiKey}&page=${pageNumer}`;
    return this.http.get(endpoint).pipe(retry(3), map(this.pickMovieResults),map(this.transformPosterPath.bind(this)));


  }

  transformPosterPath(movies) : Array<Movie>
  {
    return movies.map(movie => {
      movie.poster_path = `${this.imagePrefix}${movie.poster_path}`;
      
      return movie;

    })
  }

  pickMovieResults(response) {
    return response['results'];
  }
  

}