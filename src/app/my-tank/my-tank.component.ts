import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MyTank } from './my-tank.model';
import { TimelineMax } from 'gsap';
import { MyTankService } from './my-tank.service';
import { SpeciesService } from '../species/species.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-tank',
  templateUrl: './my-tank.component.html',
  styleUrls: ['./my-tank.component.less']
})
export class MyTankComponent implements OnInit, AfterViewInit {
  // @Input myTank;
  myTank: MyTank;
  fish;
  speciesArray = [];
  bubblesTlm = new TimelineMax();
  fishTlmLeft = new TimelineMax();
  pineappleTlm = new TimelineMax();
  fishTlmRight = new TimelineMax();
  images = [];
  tankLog: number;
  tankSizeChange: Subscription;
  calc: number;

  @ViewChild('hoverInfo', { static: false }) hoverInfo;
  @ViewChild('hoverInfoTitle', { static: false }) hoverInfoTitle;
  @ViewChild('RatingB', { static: false }) ratingB;
  @ViewChild('RatingA', { static: false }) ratingA;
  @ViewChild('medalGroup', { static: false }) medalGroup;
  @ViewChild('gallons', { static: false }) tankSize: number;

  constructor(
    private myTankService: MyTankService,
    private speciesService: SpeciesService,
    private elRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.myTank = this.myTankService.getMyTank();
    this.fish = this.myTank.speciesArray;
    this.tankSize = this.myTank.size;
    this.tankLog = Math.log10(this.tankSize);

    this.myTankService.tankSizeChange.subscribe((newSize)=> {
      this.tankSize = newSize;
      this.tankLog = Math.log10(newSize);
      this.setPineappleSize(newSize);
    });

    this.fish.forEach(speciesIndex => {
      const species = this.speciesService.getSpecies(speciesIndex);
      this.speciesArray.push(species);
      let facing = this.setStartingRotation();
      let img = species.heroImg;
      let size = species.size;
      this.images.push({img, facing, size});
    });
  }

  ngAfterViewInit() {
    this.initBubbleTlm();
    this.initFishMovement();
    this.setStartingPos();
    this.showInfo('medal');
    this.getTankRatingVars();
  }

  getTankRatingVars() {
    const rating = this.myTank.rating;
    console.log(this.ratingA.nativeElement);
    if (rating === 1) {
      this.ratingA.nativeElement.classList.remove('hidden');
      this.ratingB.nativeElement.classList.add('hidden');
      this.medalGroup.nativeElement.classList.remove('hidden');
      this.medalGroup.nativeElement.classList.remove('b-theme');
      this.medalGroup.nativeElement.classList.remove('f-theme');

    } else if (rating === 2) {
      this.ratingA.nativeElement.classList.add('hidden');
      this.ratingB.nativeElement.classList.remove('hidden');
      this.medalGroup.nativeElement.classList.remove('hidden');
      this.medalGroup.nativeElement.classList.add('b-theme');
      this.medalGroup.nativeElement.classList.remove('f-theme');

    } else {
      this.ratingA.nativeElement.classList.add('hidden');
      this.ratingB.nativeElement.classList.remove('hidden');
      this.medalGroup.nativeElement.classList.remove('hidden');
      this.medalGroup.nativeElement.classList.add('f-theme');
      this.medalGroup.nativeElement.classList.remove('b-theme');
    }
  }

  setPineappleSize(newSize: number) {
    this.calc = 3 / Math.log10(newSize) / 2;
    this.pineappleTlm.to('#decor',0, {
      scale: this.calc,
      transformOrigin: "50% 100%"
    });
  }

  setStartingPos() {
    this.fishTlmLeft.to('.fish', 0, {
      x: 'random(50, 1000)',
      y: 'random(200, 500)'
    });
    this.fishTlmLeft.to('.fish', {
      y: '+=50',
      x: '+=' + 'random(0, 200)',
      duration: 'random(5, 10)',
      stagger: {
        each: 0.5,
      },
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    }).seek(100);
  }

  //unable to get right-facing fish
  initFishMovement() {
    // this.fishTlmLeft.fromTo('.fish', {
    //   x: 'random(500, 1000)',
    //   y: 'random(-200, 200)',
    //   transformOrigin: '50% 50%'
    // }, {
    //   x: 'random(10, 400)',
    //   duration: 'random(10,20)',
    //   y: 'random(-200, 200)',
    //   repeatRefresh: true,
    //   repeat: -1,
    //   yoyo: true,
    // });

    // this.fishTlmRight.fromTo('.right', {
    //   x: 'random(500, 1000)',
    //   y: 'random(-200, 200)',
    // }, {
    //   x: 'random(10, 400)',
    //   duration: 'random(10,20)',
    //   y: 'random(-200, 200)',
    //   repeatRefresh: true,
    //   repeat: -1,
    //   yoyo: true,
    // });
  }

  initBubbleTlm() {
    this.bubblesTlm.to('#bubbles > *', 6, {
      scale: 1,
      y: -1000,
      x: 'random(-50, 50)',
      stagger: {
        each: 0.2,
        repeat: -1
      },
      repeatRefresh: true,
      repeat: -1
    });
  }

  setStartingRotation() {
    const x = Math.random();
    if (x <= 0.5) {
      return 'left';
    } else {
      return 'right';
    }
  }

  showInfo(foodType: string) {
    switch (foodType) {
      case ('worms'):
        this.hoverInfoTitle.nativeElement.innerHTML = 'Worms';
        this.hoverInfo.nativeElement.innerHTML = 'One or more fish in your tank require a surplus of iron/protein.';
        break;
      case ('flakes'):
        this.hoverInfoTitle.nativeElement.innerHTML = 'Flakes';
        this.hoverInfo.nativeElement.innerHTML = 'One or more fish in your tank require flakes. This is a general food type for smaller fish species and top-dwellers.';
        break;
      case ('pellets'):
        this.hoverInfoTitle.nativeElement.innerHTML = 'Pellets';
        this.hoverInfo.nativeElement.innerHTML = 'One or more fish in your tank require pellets, a food type required for larger fish species.';
        break;
      case ('algae'):
        this.hoverInfoTitle.nativeElement.innerHTML = 'Algae';
        this.hoverInfo.nativeElement.innerHTML = 'One or more fish in your tank require algae flakes, a food type suggested for bottom-dwellers such as catfish and loaches.';
        break;
      case ('medal'):
        this.hoverInfoTitle.nativeElement.innerHTML = 'Tank Rating';
        this.hoverInfo.nativeElement.innerHTML = 'Your tank rating is based on three key elements: space, community and number of fish of the same species.';
        break;
    }
  }
}
