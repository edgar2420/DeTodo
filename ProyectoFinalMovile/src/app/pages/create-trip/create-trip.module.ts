import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTripPageRoutingModule } from './create-trip-routing.module';

import { CreateTripPage } from './create-trip.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTripPageRoutingModule,
    GoogleMapsModule,
  ],
  declarations: [CreateTripPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateTripPageModule {}
