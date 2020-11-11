import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  NgZone,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Species } from '../../species.model';
import { TimelineMax } from 'gsap';
import { SpeciesService } from '../../species.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-species-card',
  templateUrl: './species-card.component.html',
  styleUrls: ['./species-card.component.less'],
})
export class SpeciesCardComponent implements OnInit, AfterViewInit {
  @ViewChild('imgRef', { static: false }) imageReference;
  @ViewChild('imgRefBubble', { static: false }) imageBubbleReference;
  @ViewChild('card', { static: false }) card;
  @ViewChild('moreInfoDiv', { static: false }) moreInfoDiv;
  fishHoverRotate = new TimelineMax({ paused: true });
  fishLeavetlm = new TimelineMax({ paused: true });
  cardShift = new TimelineMax({ paused: true });
  moreInfoActive = false;
  remove = '';
  @Input() species: Species;
  @Input() objIndex: number;

  constructor(
    private speciesService: SpeciesService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngAfterViewInit(): void {
    this.fishHoverRotate.to(this.imageReference.nativeElement, 1, {
      rotate: 5,
      y: 10,
    });

    this.cardShift.to(this.card.nativeElement, 0.1, {
      y: -10,
      ease: 'none',
    });
  }

  ngOnInit() {}

  animateAddToTank(img: any) {
    const tlm = new TimelineMax();
    tlm
    .fromTo(img, 0.5, { rotateY: 180 },  { x: -100 })
    .to(img, 0.5, { x: 1500, ease: 'none' })
    .to(img, 0, { y: 20, opacity: 0, x: 0, rotateY: 0 })
    .to(img, 1, { y: 0, opacity: 1});
  }

  swimAway() {
    this.moreInfoDiv.nativeElement.style.display = 'none';
    const image = this.imageReference.nativeElement;
    const imageBubble = this.imageBubbleReference.nativeElement;
    const bagColourChange =
      this.species.waterType === 'saltwater' ? '#012b5f' : '#9bdeec';

    this.moreInfoActive = true;
    this.fishHoverRotate.kill();
    this.cardShift.kill();
    this.fishLeavetlm
      .to(image, 0.5, {
        rotate: -20,
        x: 100,
        y: -100,
      })
      .to(image, 1, {
        x: -window.innerWidth,
        y: 400,
        rotate: -40,
        ease: 'power1.in',
        onComplete: () => {
          this.ngZone.run(() => {
            this.router.navigate(['/wiki', { id: this.objIndex }]);
          });
        },
      })
      .to(
        imageBubble,
        0,
        {
          background: bagColourChange,
        },
        0
      )
      .to(
        imageBubble,
        1,
        {
          scale: 20,
          duration: 1,
        },
        0
      )
      .play();
  }

  bump() {
    if (!this.fishLeavetlm.isActive() && !this.moreInfoActive) {
      this.fishHoverRotate.play();
    }
  }

  bumpReverse() {
    if (!this.fishLeavetlm.isActive() && !this.moreInfoActive) {
      this.fishHoverRotate.reverse();
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

  animateToWiki() {
    this.speciesService.fireViewMoreInfoEvent(this.objIndex);
  }
}
