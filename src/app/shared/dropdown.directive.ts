import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.closedDropdown') isClosed = true;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isClosed = this.elRef.nativeElement.contains(event.target) ? !this.isClosed : true;
  }
  constructor(private elRef: ElementRef) {}
}
