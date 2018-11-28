import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { MovieService } from "../movie.service";
import { MatDialogModule, MatSnackBarModule, MatDialog, MatSnackBar } from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Movie } from "../Movie";
import { of, Observable } from "rxjs";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from "@angular/router";
import { SearchComponent } from "./search.component";

describe('SearchComponent', () => {
    let comp: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let movieService: MovieService;

    let route: ActivatedRoute;
    

    beforeEach(async(() => {
        route =  ({ data: of({ movieType: 'watchlist' }) } as any) as ActivatedRoute;

        movieService = jasmine.createSpyObj('movieService', ['searchMovies']);
        ((movieService.searchMovies) as jasmine.Spy).and.returnValue(of(new Movie()[0]));

        TestBed.configureTestingModule({
          imports: [ BrowserAnimationsModule],
          declarations: [SearchComponent],
          providers: [
            { provide: ActivatedRoute, useValue: route },
            { provide: MovieService, useValue: movieService },
            MatSnackBar
          ],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach( () => {
            fixture = TestBed.createComponent(SearchComponent);
            comp = fixture.componentInstance;
            
      });

      it ('should create component', () => {
            expect(comp).toBeTruthy();
      });
      
     
     
});