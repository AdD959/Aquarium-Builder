import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Species } from '../species/species.model';
import { SpeciesService } from '../species/species.service';
import { TimelineMax } from 'gsap';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.less'],
})
export class WikiComponent implements OnInit, AfterViewInit {
  id: number;
  species: Species;

  @ViewChild('speciesImage', { static: false }) speciesImage;
  @ViewChild('wikiWrapper', { static: false }) wikiWrapper: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private speciesService: SpeciesService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.species = this.speciesService.getSpecies(this.id);
  }

  ngAfterViewInit(): void {
    const fishMoveIn = new TimelineMax();
    const el = this.speciesImage.nativeElement;

    console.log(el.height);

    fishMoveIn.fromTo(
      el,
      2,
      { rotateY: 180, x: -900, y: 500 },
      { scale: 0.7, rotate: -30,  y: 0, x: 0, ease: 'power1.out' }
    );
  }
}
