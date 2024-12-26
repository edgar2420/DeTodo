import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChoferService } from 'src/app/services/chofer.service';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';
import { ToastController, ModalController } from '@ionic/angular';
import { FinalizedTripsPage } from '../finalized-trips/finalized-trips.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  trips: any[] = [];
  finalizedTrips: any[] = [];
  private tripEndedSubscription!: Subscription;

  constructor(
    private choferService: ChoferService,
    private router: Router,
    private eventService: EventService,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadTrips();
    this.tripEndedSubscription = this.eventService.tripEnded$.subscribe(() => {
      this.presentToast('El viaje ha sido finalizado.');
      this.loadTrips();
    });
  }

  ngOnDestroy() {
    if (this.tripEndedSubscription) {
      this.tripEndedSubscription.unsubscribe();
    }
  }

  loadTrips() {
    this.choferService.getTrips().subscribe(
      (data) => {
        this.trips = data.filter((trip: any) => trip.status !== 2).map((trip: any) => ({
          ...trip,
          date: new Date(trip.date),
          startTime: new Date(trip.startTime)
        }));
        this.finalizedTrips = data.filter((trip: any) => trip.status === 2).map((trip: any) => ({
          ...trip,
          date: new Date(trip.date),
          startTime: new Date(trip.startTime)
        }));
      },
      (err) => {
        console.error('Error loading trips:', err);
      }
    );
  }

  createTrip() {
    this.router.navigate(['/create-trip']);
  }

  startTrip(tripId: number) {
    this.choferService.startTrip(tripId).subscribe(
      () => {
        this.router.navigate(['/trip', tripId]);
      },
      (err) => {
        console.error('Error starting trip:', err);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async openFinalizedTrips() {
    const modal = await this.modalController.create({
      component: FinalizedTripsPage,
      componentProps: { trips: this.finalizedTrips }
    });
    return await modal.present();
  }
}
