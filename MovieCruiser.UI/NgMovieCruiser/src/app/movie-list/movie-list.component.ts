import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any;
  constructor(private http: Http) { 
    this.http.get('someUrl').subscribe(movies => this.movies = movies);
  }

  ngOnInit() {
  }

}
