import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { BuyComponent } from './buy/buy.component';
import { SpeciesComponent } from './species/species.component';
import { WikiComponent } from './wiki/wiki.component';


const routes: Routes = [
  { path: '', component: WikiComponent, pathMatch: 'full' },
  { path: 'build', component: BuildComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'wiki', component: WikiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
