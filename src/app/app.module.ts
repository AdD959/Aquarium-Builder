import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BuildComponent } from './build/build.component';
import { BuyComponent } from './buy/buy.component';
import { WikiComponent } from './wiki/wiki.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { SpeciesComponent } from './species/species.component';
import { SpeciesListComponent } from './species/species-list/species-list.component';
import { SpeciesService } from './species/species.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BuildComponent,
    BuyComponent,
    WikiComponent,
    DropdownDirective,
    SpeciesComponent,
    SpeciesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SpeciesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
