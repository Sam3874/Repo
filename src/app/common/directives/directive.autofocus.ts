import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[ngAutofocus]'
})
export class autofocusDirective implements OnInit {
    constructor(private elementRef: ElementRef) { };
    ngOnInit(): void {
        this.elementRef.nativeElement.focus();
    }
}