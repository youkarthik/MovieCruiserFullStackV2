import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputUser: User;

  constructor(
    private authService: AuthenticationService,
    private router: Router) { 
      this.inputUser = new User();
  }

  ngOnInit() {
  }

  loginUser() {
    this.authService.loginUser(this.inputUser).subscribe((data) => {
      console.log(data);
      if(data) {
        this.authService.setToken(data);
        this.router.navigate(['/movies/popular']);
      }
    });
  }

}
