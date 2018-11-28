import { ThumbnailComponent } from "./thumbnail.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { MovieService } from "../movie.service";
import { MatDialogModule, MatSnackBarModule, MatDialog, MatSnackBar } from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Movie } from "../Movie";
import { of } from "rxjs";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ThumbnailComponent', () => {
    let comp: ThumbnailComponent;
    let fixture: ComponentFixture<ThumbnailComponent>;
    let movieService: MovieService;

    beforeEach(async(() => {
        movieService = jasmine.createSpyObj('movieService', ['updateWatchlistMovieComments', 'getWatchlistMovie', 'deleteWatchlistMovie']);
        ((movieService.getWatchlistMovie) as jasmine.Spy).and.returnValue(of(new Movie()));
        ((movieService.updateWatchlistMovieComments) as jasmine.Spy).and.returnValue(of(null));
        ((movieService.deleteWatchlistMovie) as jasmine.Spy).and.returnValue(of(null));

        TestBed.configureTestingModule({
          imports: [MatSnackBarModule, MatDialogModule, BrowserAnimationsModule],
          declarations: [ThumbnailComponent],
          providers: [
            { provide: MovieService, useValue: movieService },
            MatSnackBar, MatDialog
          ],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach( () => {
            fixture = TestBed.createComponent(ThumbnailComponent);
            comp = fixture.componentInstance;
            comp.movie = new Movie();
            
      });

      it ('should create component', () => {
            expect(comp).toBeTruthy();
      });

      describe ('OnAdd', () => {
            it ('makes expected service call getWatchlistMovie', () => {
                //spyOn(comp, 'add').and.returnValue({ subscribe: () => {} })
                comp.onAdd();
                expect(movieService.getWatchlistMovie).toHaveBeenCalled();
            });
      });

      describe ('onRemove', () => {
            it ('makes expected service call deleteWatchlistMovie', () => {
                comp.onRemove();
                expect(movieService.deleteWatchlistMovie).toHaveBeenCalled();
            });
      });
});