import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable()
export class messageService {
    constructor(public snackBar: MatSnackBar) {
    }
    showMessage(message: string, action: string) {
        let config = new MatSnackBarConfig();
        config.duration = 3000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        this.snackBar.open(message, action, config);
    }
}