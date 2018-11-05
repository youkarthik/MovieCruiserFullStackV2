import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User;
  constructor(
    private authService: AuthenticationService,
    private router: Router, private snackBar: MatSnackBar) { 
      this.newUser = new User(); 
  }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.newUser)
      .subscribe((data) => {
        this.snackBar.open('User registered successfully', '', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error => {  this.snackBar.open('User already exists', '', { duration: 5000 }); }
      );    
  }

}
