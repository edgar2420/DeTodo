import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizedTripsPageRoutingModule } from './finalized-trips-routing.module';

import { FinalizedTripsPage } from './finalized-trips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizedTripsPageRoutingModule
  ],
  declarations: [FinalizedTripsPage]
})
export class FinalizedTripsPageModule {}
