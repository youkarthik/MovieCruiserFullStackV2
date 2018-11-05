import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputUser: User;

  constructor(
    private authService: AuthenticationService,
    private router: Router, private snackBar: MatSnackBar) { 
      this.inputUser = new User();
  }

  ngOnInit() {
    this.authService.removeToken();
  }

  loginUser() {
   this.authService.loginUser(this.inputUser).subscribe((data) => {
     
      if(data) {
        this.authService.setToken(data);
        this.router.navigate(['/movies/popular']);
      }
      
    }, error => {  this.snackBar.open('Invalid Credentials', '', { duration: 5000  })});
  }

}
