import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizedTripsPage } from './finalized-trips.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizedTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizedTripsPageRoutingModule {}
