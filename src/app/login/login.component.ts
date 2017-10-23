import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { messageService } from '../common/services/message.service/message.service'; 
import { AuthenticationService } from '../common/services/authentication.service/authentication.service';
 
@Component({
    templateUrl: './login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: messageService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => { console.log(data);
                    this.router.navigate([this.returnUrl]);
                    this.loginSuccess.emit(data);
                    location.reload();
                },
                error => {
                    this.messageService.showMessage(error, '');
                    this.loading = false;
                });
    }

    @Output('loginSuccess')     //for sending login user info to parent component (appComponent) on HomePage
    loginSuccess: EventEmitter<any> = new EventEmitter<any>();
  
}