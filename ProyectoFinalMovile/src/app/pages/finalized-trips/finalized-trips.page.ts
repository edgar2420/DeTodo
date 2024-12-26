import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-finalized-trips',
  templateUrl: './finalized-trips.page.html',
  styleUrls: ['./finalized-trips.page.scss'],
})
export class FinalizedTripsPage {

  @Input() trips: any[] = [];

  constructor(private modalController: ModalController) { }

  close() {
    this.modalController.dismiss();
  }
}
