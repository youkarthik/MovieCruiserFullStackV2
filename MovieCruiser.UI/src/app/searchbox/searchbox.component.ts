import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-search-box',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  searchText: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearch(): void {
    this.router.navigate(['movies/search'],
      { queryParams: { q: this.searchText }, skipLocationChange: false });
         //this.searchText = '';
  }

}