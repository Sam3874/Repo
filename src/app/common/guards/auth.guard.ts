import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { messageService } from '../services/message.service/message.service'; 
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private messageService: messageService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.messageService.showMessage("Please login first..", "Got It!");
        return false;
    }
}