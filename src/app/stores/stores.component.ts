import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TimelineMax } from 'gsap';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.less'],
})
export class StoresComponent implements OnInit {
  hoverStateTlm = new TimelineMax();
  defaultState = true;
  recommendBtnFront = true;
  ourStoresBtnFront = false;

  @ViewChild('ourStores', { static: false }) ourStores;
  @ViewChild('ourStoresList', { static: false }) ourStoresList;
  @ViewChild('recommend', { static: false }) recommend;
  @ViewChild('recommendList', { static: false }) recommendList;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initHoverStates();
  }
  initHoverStates() {
    this.hoverStateTlm.set('#mapGroup', {
      scale: 0.5,
      transformOrigin: '50% 10%',
    });
    this.hoverStateTlm.set('#locations_1_ > g > g', {
      scale: 0,
      transformOrigin: '50% 50%',
    });
  }

  zoom(country: number) {
    let target = '#Layer_1 > g';
    if (this.defaultState) {
      switch (country) {
        case 1:
          //uk
          this.hoverStateTlm.to(target, {
            scale: 5,
            transformOrigin: '50% 50%',
            x: 200,
            y: 250,
          });
          break;
        //us
        case 2:
          this.hoverStateTlm.to(target, {
            scale: 3,
            transformOrigin: '50% 50%',
            x: 920,
            y: -50,
          });
          break;
        //australia
        case 3:
          this.hoverStateTlm.to(target, {
            scale: 3,
            transformOrigin: '50% 50%',
            x: -1020,
            y: -650,
          });
          break;
      }
      this.hoverStateTlm.to('#locations_1_ > g > g', {
        scale: 1,
        transformOrigin: '50% 50%',
      });
    } else {
      this.hoverStateTlm.to('#locations_1_ > g > g', {
        scale: 0,
        transformOrigin: '50% 50%',
      });
      this.hoverStateTlm.to(target, { scale: 0.5, x: 0, y: 0 });
    }
    this.defaultState = !this.defaultState;
  }

  toggleButtons() {
    this.recommendBtnFront = !this.recommendBtnFront;
    this.ourStoresBtnFront = !this.ourStoresBtnFront;

    if (this.recommendBtnFront) {
      this.recommendList.nativeElement.classList.remove('hidden');
      this.ourStoresList.nativeElement.classList.add('hidden');
      this.getGoogleData();
    } else {
      this.recommendList.nativeElement.classList.add('hidden');
      this.ourStoresList.nativeElement.classList.remove('hidden');
    }
  }

  getGoogleData() {

  }
}
