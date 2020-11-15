import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Species } from '../species/species.model';
import { SpeciesService } from '../species/species.service';
import { TimelineMax, gsap } from 'gsap';
import { SideBarService } from '../shared/sidebar.service';
import { MyTankService } from '../my-tank/my-tank.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.less'],
})
export class WikiComponent implements OnInit, AfterViewInit {
  id: number;
  species: Species;
  photoUrls: string[] = [];
  // zoomed = false;
  zoomed = new Array(4);
  addBtnEnabled = false;
  fishMoveIn = new TimelineMax();
  fishBgMove = new TimelineMax();
  hoverTlm = new TimelineMax({ paused: true });
  moveTlm = new TimelineMax({ paused: true});

  @ViewChild('speciesImage', { static: false }) speciesImage;
  @ViewChild('wikiWrapper', { static: false }) wikiWrapper: ElementRef;
  @ViewChildren('infoWrapper') infoWrapperChildren;

  constructor(
    private route: ActivatedRoute,
    private speciesService: SpeciesService,
    private sideBarService: SideBarService,
    private myTankService: MyTankService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.zoomed.fill(false);
  }

  ngOnInit() {
    this.species = this.speciesService.getSpecies(this.id);
    this.getPhotos(this.id);
  }

  // NeedsBackendDev
  getPhotos(id: number) {
    let i: number;
    for (i = 1; i <= 4; i++) {
      let photoUrl: string;
      if (id == 3) {
        photoUrl = `../assets/images/photos/${id}/${i}.jpg`;
      } else {
        photoUrl = '../assets/images/placeholders/imgPlaceholder.png';
      }
      this.photoUrls.push(photoUrl);
    }
  }

  addToTank() {
    this.myTankService.addToTank(this.species.id);
  }

  animateAddToTank() {
    if (this.addBtnEnabled) {
      this.hoverTlm.pause();
      this.sideBarService.triggerSideBar();
      this.moveTlm.restart();
    }
  }

  zoomToggle(i: number) {
    const oldVal = this.zoomed[i];
    this.zoomed.forEach((val, index) => {
      this.zoomed[index] = false;
    });
    this.zoomed[i] = !oldVal;
  }

  ngAfterViewInit(): void {
    const el = this.speciesImage.nativeElement;
    const xPosStart = [-500, -200, 300];
    const xPosFin = [1500, 1500, 1700];

    this.moveTlm
      .to(el, 0.5, { x: -100, y: 150, rotate: 0 })
      .to(el, 1, { x: 1500, rotate: 0 })
      .to(el, 0, { rotate: 0, y: 600, x: -800 })
      .to(el, 2, { y: 0, x: 0, rotate: -30 })
      .to(el, 1, {
        y: 0,
        onComplete: () => {
          this.hoverTlm.restart();
        },
      });

    this.hoverTlm.to(el, 10, {
      y: 46,
      repeat: -1,
      yoyo: true,
      rotate: -20,
      ease: 'power1.inOut',
      transformOrigin: '50% 50%',
    });

    this.fishBgMove.fromTo(
      '.imgWrapper > *:not(:nth-child(1)',
      2,
      {
        x: gsap.utils.wrap(xPosStart),
        y: 1000,
        scale: 0.6,
        rotateY: 180,
        rotate: -30,
      },
      {
        x: gsap.utils.wrap(xPosFin),
        y: -600,
        ease: 'none',
        stagger: {
          each: 0.3,
        },
      }
    );

    this.fishBgMove.fromTo(
      el,
      2,
      { rotateY: 180, x: -900, y: 500 },
      {
        scale: 0.8,
        rotate: -30,
        y: 0,
        x: 0,
        ease: 'power1.out',
        onComplete: () => {
          this.addBtnEnabled = true;
          this.hoverTlm.play();
        },
      },
      0
    );

    this.textFadeIn();
  }

  textFadeIn() {
    const tlm = new TimelineMax();

    tlm
      .fromTo(
        '.infoWrapper > *',
        2,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          stagger: {
            each: 0.2,
          },
          ease: 'power2.out',
        }
      )
      .fromTo(
        '#tabs > *',
        1,
        {
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.2,
          },
          ease: 'power2.out',
        },
        1
      );

    if (this.species.waterType === 'saltwater') {
      tlm.fromTo(
        '#wikiWrapper',
        2,
        {
          background: 'linear-gradient(#012b5f, #012b5f)',
        },
        {
          background: 'linear-gradient(#1787ca, #1b2348)',
        },
        0
      );
    } else {
      tlm.fromTo(
        '#wikiWrapper',
        2,
        {
          background: 'linear-gradient(-135deg, #9bdeec, #9bdeec)',
        },
        {
          background: 'linear-gradient(-135deg, #1787ca, #caffd6)',
        },
        0
      );
    }
  }
}
