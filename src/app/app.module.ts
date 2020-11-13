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
import { SpeciesCardComponent } from './species/species-list/species-card/species-card.component';
import { MyTankSidebarComponent } from './my-tank-sidebar/my-tank-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarService } from './shared/sidebar.service';
import { ResidentListItemComponent } from './my-tank-sidebar/resident-list-item/resident-list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BuildComponent,
    BuyComponent,
    WikiComponent,
    DropdownDirective,
    SpeciesComponent,
    SpeciesListComponent,
    SpeciesCardComponent,
    MyTankSidebarComponent,
    ResidentListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    SpeciesService,
    SideBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
