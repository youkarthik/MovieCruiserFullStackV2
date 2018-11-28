import { DetaildialogComponent } from "./detaildialog.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { MovieService } from "../movie.service";
import { of } from "rxjs";
import { Movie } from "../Movie";
import { MatSnackBarModule, MatDialogModule, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe ('detaildialogcomponent', () => {
    let comp: DetaildialogComponent;
    let fixture: ComponentFixture<DetaildialogComponent>;
    let movieService: MovieService;

    beforeEach(async(() => {
        movieService = jasmine.createSpyObj('movieService', ['addWatchlistMovie', 'getWatchlistMovie', 'deleteWatchlistMovie']);
        ((movieService.getWatchlistMovie) as jasmine.Spy).and.returnValue(of(new Movie()));
        ((movieService.addWatchlistMovie) as jasmine.Spy).and.returnValue(of(null));
        ((movieService.deleteWatchlistMovie) as jasmine.Spy).and.returnValue(of(null));

        TestBed.configureTestingModule({
          imports: [MatSnackBarModule, MatDialogModule, BrowserAnimationsModule],
          declarations: [DetaildialogComponent],
          providers: [
            { provide: MovieService, useValue: movieService },
            { provide: MatDialogRef, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: { obj: new Movie()} },
            MatSnackBar
          ],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach( () => {
            fixture = TestBed.createComponent(DetaildialogComponent);
            comp = fixture.componentInstance;
            comp.movie = new Movie();
            
      });

      it ('should create component', () => {
        expect(comp).toBeTruthy();
    });

    describe ('onAddWatchlist', () => {
        it ('makes expected service call addWatchlistMovie', () => {
            //spyOn(comp, 'add').and.returnValue({ subscribe: () => {} })
            comp.onAddWatchlist();
            expect(movieService.addWatchlistMovie).toHaveBeenCalled();
        });
    });

    describe ('onRemoveWatchlist', () => {
        it ('makes expected service call deleteWatchlistMovie', () => {
            //spyOn(comp, 'add').and.returnValue({ subscribe: () => {} })
            comp.onRemoveWatchlist();
            expect(movieService.deleteWatchlistMovie).toHaveBeenCalled();
        });
    });


});