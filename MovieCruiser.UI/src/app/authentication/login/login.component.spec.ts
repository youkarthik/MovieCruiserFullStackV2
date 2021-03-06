import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";

describe('LoginComponenet', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let router: Router;
    let authService: AuthenticationService;

    beforeEach(async(() => {
        router = jasmine.createSpyObj('router', ['navigate']);
        authService = jasmine.createSpyObj('authService', ['setToken']);
    
        TestBed.configureTestingModule({
          imports: [MatSnackBarModule],
          declarations: [LoginComponent],
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
      });
    
      it('should create component', () => {
        expect(component).toBeTruthy();
      });

      
  
});