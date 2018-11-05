import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService } from './authentication/authentication.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent  {
  isloggedIn: boolean;
  constructor(private router: Router, private auth: AuthenticationService) { 
      this.isloggedIn = !this.auth.isTokenExpired();
      console.log(this.isloggedIn);
  }
  onEnter(searchKey) {
    this.router.navigate(['/search', searchKey]);
    
  }

  logout() {
    this.auth.removeToken();
    this.router.navigate (['/login']);
  }
}
