import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { MovieService } from "../movie.service";
import { MatDialogModule, MatSnackBarModule, MatDialog, MatSnackBar } from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Movie } from "../Movie";
import { of, Observable } from "rxjs";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from "./container.component";
import { Router, ActivatedRoute } from "@angular/router";

describe('ContainerComponent', () => {
    let comp: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;
    let movieService: MovieService;

    let route: ActivatedRoute;
    

    beforeEach(async(() => {
        route =  ({ data: of({ movieType: 'watchlist' }) } as any) as ActivatedRoute;

        movieService = jasmine.createSpyObj('movieService', ['getWatchListMovies', 'getMovies']);
        ((movieService.getWatchListMovies) as jasmine.Spy).and.returnValue(of(new Movie()[0]));
        ((movieService.getMovies) as jasmine.Spy).and.returnValue(of(new Movie()[0]));

        TestBed.configureTestingModule({
          imports: [MatSnackBarModule, MatDialogModule, BrowserAnimationsModule],
          declarations: [ContainerComponent],
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
            fixture = TestBed.createComponent(ContainerComponent);
            comp = fixture.componentInstance;
            
      });

      it ('should create component', () => {
            expect(comp).toBeTruthy();
      });
      
      it ('makes expected service call getWatchListMovies', () => {
          comp.movieType = 'watchlist';
          comp.load();
          expect(movieService.getWatchListMovies).toHaveBeenCalled();
      });

      it ('makes expected service call getMovies', () => {
        comp.movieType = 'tmdb';
        comp.load();
        expect(movieService.getMovies).toHaveBeenCalled();
    });
     
});