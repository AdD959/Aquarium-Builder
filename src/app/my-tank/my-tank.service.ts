import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyTank } from './my-tank.model';

@Injectable()
export class MyTankService {
  private myTank: MyTank = new MyTank(true);
  watchTank = new Subject<{}>();

  getMyTank() {
    return this.myTank;
  }

  getMySpeciesArray() {
    return this.myTank.speciesArray;
  }

  addToTank(id: number) {
    this.myTank.speciesArray.push(id);
    this.tankUpdated();
  }

  tankUpdated() {
    this.watchTank.next(this.myTank.speciesArray.slice());
  }

  removeResident(id: number) {
    const removalIndex = this.myTank.speciesArray.indexOf(id);
    this.myTank.speciesArray.splice(removalIndex, 1);
    this.tankUpdated();
  }
}
