import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectLocationPageRoutingModule } from './select-location-routing.module';

import { SelectLocationPage } from './select-location.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectLocationPageRoutingModule,
    GoogleMapsModule,
  ],
  declarations: [SelectLocationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectLocationPageModule {}
