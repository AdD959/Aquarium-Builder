import { Component, Input, OnInit } from '@angular/core';
import { Species } from '../../species.model';

@Component({
  selector: 'app-species-card',
  templateUrl: './species-card.component.html',
  styleUrls: ['./species-card.component.less'],
})
export class SpeciesCardComponent implements OnInit {
  expanded = false;

  constructor() {}

  @Input() species: Species;

  ngOnInit() {}

  expandMoreInfo() {
    this.expanded = !this.expanded;
  }

  swimAway(imgRef) {

  }
}
