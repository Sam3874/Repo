import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { messageService } from '../common/services/message.service/message.service';  
import { UserService } from '../common/services/user.service';
 
@Component({
    templateUrl: './register.component.html'
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService,
        private messageService: messageService) { }
 
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.messageService.showMessage('Registration successful', '');
                    this.router.navigate(['/login']);
                },
                error => {
                    this.messageService.showMessage(error, '');
                    this.loading = false;
                });
    }
}