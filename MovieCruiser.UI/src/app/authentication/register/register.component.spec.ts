import { RegisterComponent } from "./register.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { MatSnackBarModule, MatSnackBar } from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";

describe('RegisterComponenet', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    let router: Router;
    let authService: AuthenticationService;

    beforeEach(async(() => {
        router = jasmine.createSpyObj('router', ['navigate']);
        authService = jasmine.createSpyObj('authService', ['registerUser']);
    
        TestBed.configureTestingModule({
          imports: [MatSnackBarModule, FormsModule],
          declarations: [RegisterComponent],
          providers: [
            { provide: Router, useValue: router },
            { provide: AuthenticationService, useValue: authService },
            MatSnackBar
          ],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
      });
    
      it('should create component', () => {
        expect(component).toBeTruthy();
      });

      
  
});