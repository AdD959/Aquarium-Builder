import { animate, style, transition, trigger } from '@angular/animations';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ width: 0 }),
        animate('0.2s ease-out', style({ width: 350 })),
      ]),
      transition(':leave', [
        style({ width: 350 }),
        animate('0.2s ease-in', style({ width: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  myTankExpanded = false;

  constructor() {}

  toggleMyTank() {
    this.myTankExpanded = !this.myTankExpanded;
  }
}
