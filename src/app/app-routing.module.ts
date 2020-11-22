import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { BuyComponent } from './buy/buy.component';
import { MyTankComponent } from './my-tank/my-tank.component';
import { SpeciesComponent } from './species/species.component';
import { WikiComponent } from './wiki/wiki.component';


const routes: Routes = [
  { path: '', component: SpeciesComponent, pathMatch: 'full' },
  { path: 'build', component: BuildComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'my-tank', component: MyTankComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
