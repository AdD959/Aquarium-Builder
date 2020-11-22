import { Component, Input, OnInit } from '@angular/core';
import { MyTank } from './my-tank.model';
import { MyTankService } from './my-tank.service';

@Component({
  selector: 'app-my-tank',
  templateUrl: './my-tank.component.html',
  styleUrls: ['./my-tank.component.less']
})
export class MyTankComponent implements OnInit {
  // @Input myTank;
  myTank: MyTank;
  fish;

  constructor(private myTankService: MyTankService) { }

  ngOnInit() {
    this.myTank = this.myTankService.getMyTank();
    this.fish = this.myTank.speciesArray;
  }
}
