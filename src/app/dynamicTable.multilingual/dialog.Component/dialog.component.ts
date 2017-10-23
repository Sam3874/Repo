import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app',
    templateUrl: './dialog.template.html'
})
export class dialogMultilingualComponent {
    refQuantity: any;
    action: string;
    constructor(public dialogRef: MatDialogRef<dialogMultilingualComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.refQuantity = data.dialogOptions.OptionQuantity;
    }

    ngOnInit() {
    }

    resetQuantity(option, quantityModel) {
        (option.value) && (quantityModel.OptionQuantity = this.refQuantity);
    }

    submitActions(fmDialog: NgForm, result): void {        
        if (this.action == 'Submit') {
            if (fmDialog.valid) this.dialogRef.close(result);
        } else {
            this.dialogRef.close();
        }
    }
}