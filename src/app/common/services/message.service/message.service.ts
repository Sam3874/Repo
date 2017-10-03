import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig, MdSnackBarHorizontalPosition, MdSnackBarVerticalPosition } from '@angular/material';

@Injectable()
export class messageService {
    constructor(public snackBar: MdSnackBar) {
    }
    showMessage(message: string, action: string) {
        let config = new MdSnackBarConfig();
        config.duration = 3000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        this.snackBar.open(message, action, config);
    }
}