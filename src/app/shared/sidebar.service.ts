import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SideBarService {
  toggleSideBar = new Subject();

  triggerSideBar() {
    this.toggleSideBar.next();
  }
}
