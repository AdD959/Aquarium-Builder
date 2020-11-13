import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyTank } from './my-tank.model';

@Injectable()
export class MyTankService {
  private myTank: MyTank = new MyTank(true);
  watchTank = new Subject<number>();

  getMyTank() {
    this.watchTank.next();
    return this.myTank.speciesArray;
  }

  tankUpdated() {
    this.watchTank.next();
  }
}
