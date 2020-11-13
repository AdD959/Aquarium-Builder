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
import { SideBarService } from 'src/app/shared/sidebar.service';

@Component({
  selector: 'app-species-card',
  templateUrl: './species-card.component.html',
  styleUrls: ['./species-card.component.less']
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
  size: string;
  @Input() species: Species;
  @Input() objIndex: number;

  constructor(
    private speciesService: SpeciesService,
    private router: Router,
    private ngZone: NgZone,
    private sideBarService: SideBarService
  ) {
  }


  ngAfterViewInit(): void {
    this.fishHoverRotate.to(this.imageReference.nativeElement, 2, {
      rotate: 5,
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

  }

  ngOnInit() {
    this.getSpeciesSize();
  }

  getSpeciesSize() {
    const i = this.species.size;
    if (i < 5) { this.size = 'X-SMALL'; return; } else
    if (i < 15) { this.size = 'SMALL'; return; } else
    if (i < 50) { this.size = 'MEDIUM'; return; } else
    if (i < 100) { this.size = 'LARGE'; return; } else { this.size = 'X-LARGE'; return; }
  }

  animateAddToTank(img: any) {
    this.fishHoverRotate.kill();
    this.sideBarService.triggerSideBar();
    const tlm = new TimelineMax();
    tlm
    .fromTo(img, 0.5, {  zIndex: 500 },  { x: -100, y: 150, rotateY: 180 })
    .to(img, 0.5, {  x: 1400, zIndex: 99, ease: 'none' })
    .to(img, 0, { y: 20, opacity: 0, x: 0, rotateY: 0 })
    .to(img, 1, { y: 0, opacity: 1});
  }

  swimAway() {
    this.sideBarService.triggercloseSideBar();
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
