import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication/authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private route: Router, private auth: AuthenticationService) {}

    canActivate() {
        if(!this.auth.isTokenExpired()) return true;
        this.route.navigate(['/login']);
        return false;
    }
}