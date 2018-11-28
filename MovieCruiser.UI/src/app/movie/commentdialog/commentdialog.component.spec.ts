import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { Movie } from "../Movie";
import { MatDialogModule, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CommentdialogComponent } from "./commentdialog.component";

describe ('commentdialogcomponent', () => {
    let comp: CommentdialogComponent;
    let fixture: ComponentFixture<CommentdialogComponent>;

    beforeEach(async(() => {
       

        TestBed.configureTestingModule({
          imports: [ MatDialogModule, BrowserAnimationsModule],
          declarations: [CommentdialogComponent],
          providers: [
            { provide: MatDialogRef, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: { obj: new Movie()} },
            MatSnackBar          ],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach( () => {
            fixture = TestBed.createComponent(CommentdialogComponent);
            comp = fixture.componentInstance;
            
      });

      it ('should create component', () => {
        expect(comp).toBeTruthy();
    });

    


});