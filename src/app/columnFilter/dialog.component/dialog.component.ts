import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app',
    templateUrl: './dialog.template.html',
    /* animations: [
        trigger('dropDown', [
            transition('void => *', [
                style({ height: '0' }),
                animate(300, style({ height: '*' }))
            ]),
            transition('* => void', [
                style({ height: '*' }),
                animate(200, style({ height: '0' }))
            ])
        ])
    ] */
})
export class dialogFilterComponent {
    refQuantity: any;
    action: string;    
    options: string[];
    //filterControl: FormControl;
    filteredOptions: Observable<string[]>;
    dialogFormGroup: FormGroup;

    constructor(fb: FormBuilder, public dialogRef: MatDialogRef<dialogFilterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogFormGroup = fb.group({
            'filterControl': [null, Validators.required]
        });
        this.options = data.options;
    }

    ngOnInit() {                
        let filterControl = this.dialogFormGroup.controls['filterControl'];
        this.filteredOptions = filterControl.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : this.options.slice());
    }

    submitActions(fmDialog: NgForm, result): void {
        if (this.action == 'Apply' || this.action == 'Remove') {
            if (fmDialog.valid) this.dialogRef.close({ action: this.action, filter: result });

        } else {
            this.dialogRef.close();
        }
    }

    filter(val: string): string[] {
        return this.options.filter(option =>
            String(option).toLowerCase().indexOf(val.toLowerCase()) !== -1);
    }

}