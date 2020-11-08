import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Species } from '../../species.model';
import { TimelineMax } from 'gsap';
import { SpeciesService } from '../../species.service';

@Component({
  selector: 'app-species-card',
  templateUrl: './species-card.component.html',
  styleUrls: ['./species-card.component.less'],
})
export class SpeciesCardComponent implements OnInit, AfterViewInit {
  @ViewChild('imgRef', {static: false}) imageReference;
  @ViewChild('imgRefWrapper', {static: false}) imageWrapperReference;
  @ViewChild('card', {static: false}) card;
  tlm = new TimelineMax({paused: true});
  fishLeavetlm = new TimelineMax({ paused: true});
  cardShift = new TimelineMax({ paused: true});
  moreInfoActive = false;
  @Input() species: Species;

  constructor(private speciesService: SpeciesService) {}
  ngAfterViewInit(): void {
    this.tlm.to(this.imageReference.nativeElement, 1, {
      rotate: 5,
      y: 10
    });

    this.cardShift.to(this.card.nativeElement, 0.1, {
      y: -10,
      ease: 'none'
    });
  }


  ngOnInit() {}

  swimAway(imgRef, imgRefWrapper) {
    const image = this.imageReference.nativeElement;
    const imageWrapper = this.imageWrapperReference.nativeElement;

    this.moreInfoActive = true;
    this.tlm.pause();
    this.fishLeavetlm
      .to(image, 0.5, {
        rotate: -20,
        x: 100,
        y: -100
      })
      .to(image, 1, {
        x: -window.innerWidth,
        y: 300,
        ease: 'power1.in'
      })
      .to(imageWrapper, 1, {
        scale: 20,
        duration: 1
      }, 0)
      .play();
  }

  bump(imgRef, imgWrapper) {
    if (!this.fishLeavetlm.isActive()) {
      this.tlm.play();
    }
  }

  bumpReverse(imgRef, imgWrapper) {
    if (!this.fishLeavetlm.isActive()) {
      this.tlm.reverse();
    }
  }

  cardBump() {
    if (!this.moreInfoActive) {
      this.cardShift.play();
    }
  }

  cardBumpReverse() {
    if (!this.moreInfoActive) {
      this.cardShift.reverse();
    }
  }
}
