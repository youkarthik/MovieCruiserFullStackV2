import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService } from './authentication/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private router: Router, private auth: AuthenticationService) { }
  onEnter(searchKey) {
    this.router.navigate(['/search', searchKey]);
    
  }

  logout() {
    this.auth.removeToken();
    this.router.navigate (['/login']);
  }
}
