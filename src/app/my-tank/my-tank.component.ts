import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
  tankSize: number;
  tankLog: number;
  tankSizeChange: Subscription;
  calc: number;

  constructor(
    private myTankService: MyTankService,
    private speciesService: SpeciesService) { }

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
}
