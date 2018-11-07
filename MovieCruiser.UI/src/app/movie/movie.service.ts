import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators'
import { Movie } from './Movie'
import { MovieHttpClient } from './moviehttpclient.service';


@Injectable()
export class MovieService {
  apiKey: string = '65d23c85df26295f74201c1a729f31d3';
  tmdbEndpoint: string = 'https://api.themoviedb.org/3/';
  searchEndpoint: string = 'https://api.themoviedb.org/3/search';
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  watchlistApiServerPath: string = 'http://localhost:8089';
  fullWatchlistEndpoint = `${this.watchlistApiServerPath}/api/movie`;
  constructor(private http: HttpClient, private movieHttp: MovieHttpClient) { }

  getMovies(type: string, pageNumer: number = 1): Observable<Array<Movie>> {
    if (type) {
      const endpoint = `${this.tmdbEndpoint}movie/${type}?api_key=${this.apiKey}&page=${pageNumer}`;
      return this.http.get(endpoint).pipe(retry(3), catchError(this.handleError), map(this.pickMovieResults), map(this.transformPosterPath.bind(this)));
    }

  }
  getWatchListMovies(): Observable<Array<Movie>> {
    return this.movieHttp.get<Array<Movie>>(this.fullWatchlistEndpoint).pipe(retry(3), catchError(this.handleError));
  }
  searchMovies(searchString: string): Observable<Array<Movie>> {
    const endpoint = `${this.searchEndpoint}/movie?api_key=${this.apiKey}&&language=en-US&page=1&include_adult=false&query=${searchString}`;
    if (searchString.length > 0) {
      return this.http.get<Array<Movie>>(endpoint).pipe(
        retry(3),
        catchError(this.handleError),
        map(this.pickMovieResults),
        map(this.transformPosterPath.bind(this)),
      );
    }
  }

  addWatchlistMovie(movie: Movie): Observable<Movie> {
    return this.movieHttp.post<Movie>(this.fullWatchlistEndpoint, movie).pipe(
      catchError(this.handleError)
    );
  }

  getWatchlistMovie(id: number): Observable<Movie> {
    const endpoint = `${this.fullWatchlistEndpoint}/${id}`;
    return this.movieHttp.get<Movie>(endpoint);
  }
  deleteWatchlistMovie(id: number): Observable<{}> {
    const endpoint = `${this.fullWatchlistEndpoint}/${id}`;
    return this.movieHttp.delete(endpoint)
      .pipe(
        catchError(this.handleError)
      );

  }
  updateWatchlistMovieComments(id: number, comments: string): Observable<{}> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    const endpoint = `${this.fullWatchlistEndpoint}/${id}`;
    return this.movieHttp.put(endpoint, JSON.stringify(comments)).pipe(
      catchError(this.handleError)
    );
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}