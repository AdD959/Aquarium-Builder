import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SideBarService {
  toggleSideBar = new Subject();
  closeSideBar = new Subject();
  moveLabel = new Subject();
  resetLabel = new Subject();

  triggerSideBar() {
    this.toggleSideBar.next();
  }

  triggercloseSideBar() {
    this.closeSideBar.next();
  }
}
