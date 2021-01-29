import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TimelineMax, gsap } from 'gsap';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.less'],
})
export class IntroComponent implements OnInit, AfterViewInit {
  constructor() {}

  @ViewChild('introSection', { static: false }) introSection;

  ngOnInit() {}

  ngAfterViewInit() {

    this.introSection.nativeElement.addEventListener('scroll', function (e) {
      document.body.scrollTop = 0;
    });
    this.introSection.nativeElement.addEventListener(
      'wheel',
      this.wheelListener
    );

    const timeline = gsap.timeline();

    timeline.fromTo(
      '.wiki-bubble',
      4,
      {
        opacity: 0,
        y: 100,
        x: 'random(0,2000)',
        scale: 'random(0.5, 3)'
      },
      {
        y: -4000,
        stagger: {
          each: 0.25,
        },
        repeatRefresh: true,
        opacity: 0.4,
        ease: 'none',
        repeat: -1
      },
      1
    ).seek(4);
  }

  pageHeight = window.innerHeight - 115;
  isAnimating = false;
  scrollLimitMax = 5;
  scrollLimitMin = 0;
  scrollValue = 1;
  wheelListener(e) {
    if (e.deltaY > 0 && this.scrollValue < this.scrollLimitMax) {
      this.scrollPage(-this.pageHeight);
      this.scrollValue++;
    } else if (e.deltaY < 0 && this.scrollValue > this.scrollLimitMin) {
      this.scrollPage(+this.pageHeight);
      this.scrollValue--;
    }
  }

  scrollPage(scrollSize) {
    this.isAnimating = true;
    var yPos = this.getNewYPos(scrollSize);
    document.body.style.transform = 'translate3d(0px,' + yPos + ',0px)';
  }

  getNewYPos(add) {
    var oldYPos = document.body.style.transform.split(',')[1];
    let temp = parseInt(oldYPos);
    temp = parseInt(oldYPos.replace(/px/, ''));
    var newYPos = temp + add;
    if (newYPos > 0) {
      this.isAnimating = false;
    }
    return Math.min(0, newYPos) + 'px';
  }
}
