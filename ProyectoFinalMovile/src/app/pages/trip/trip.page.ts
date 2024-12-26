import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoferService } from 'src/app/services/chofer.service';
import { SocketService } from 'src/app/services/socket.service';
import { Socket } from 'socket.io-client';
import { AlertController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  tripId: number;
  tripDetails: any;
  socket!: Socket;
  mapCenterLat: number = 0;
  mapCenterLng: number = 0;
  zoom: number = 14;
  selectedPickupLat?: number;
  selectedPickupLng?: number;

  constructor(
    private route: ActivatedRoute,
    private choferService: ChoferService,
    private socketService: SocketService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private eventService: EventService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.tripId = id !== null ? parseInt(id, 10) : 0;
  }

  ngOnInit() {
    this.loadTripDetails();
    this.connectToSocket();
  }

  loadTripDetails() {
    this.choferService.getTripDetails(this.tripId).subscribe(
      (data) => {
        this.tripDetails = {
          ...data,
          date: new Date(data.date),
          startTime: new Date(data.startTime),
          stops: data.stops.map((stop: any) => ({
            ...stop,
            time: new Date(stop.time),
            lat: parseFloat(stop.lat),
            lng: parseFloat(stop.lng)
          }))
        };
        this.mapCenterLat = parseFloat(this.tripDetails.latOrigin);
        this.mapCenterLng = parseFloat(this.tripDetails.lngOrigin);
      },
      (err) => {
        console.error('Error loading trip details:', err);
      }
    );
  }

  connectToSocket() {
    this.socket = this.socketService.connect(this.tripId);
    this.socket.emit('identificarChofer', { tripId: this.tripId });

    this.socket.on('update', (data: any) => {
      console.log('Datos de actualización recibidos:', data);
    });
  }

  updateDriverLocation(lat: number, lng: number) {
    this.socket.emit('actualizarChofer', { lat, lng });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.selectedPickupLat = event.latLng.lat();
      this.selectedPickupLng = event.latLng.lng();
      this.markAtPickupPoint();
    }
  }

  markAtPickupPoint() {
    if (this.selectedPickupLat && this.selectedPickupLng) {
      this.socket.emit('enPuntoRecogida', {
        tripId: this.tripId,
        lat: this.selectedPickupLat,
        lng: this.selectedPickupLng
      });
    }
  }

  leavePickupPoint() {
    if (this.selectedPickupLat && this.selectedPickupLng) {
      this.socket.emit('dejandoPuntoRecogida', {
        tripId: this.tripId,
        lat: this.selectedPickupLat,
        lng: this.selectedPickupLng
      });
    }
  }

  async endTrip() {
    this.socket.emit('finalizarViaje', { tripId: this.tripId });

    const alert = await this.alertController.create({
      header: 'Viaje Finalizado',
      message: 'El viaje ha sido finalizado exitosamente.',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.eventService.emitTripEnded();
            await this.presentToast('El viaje ha sido finalizado.');
            this.router.navigate(['/home'], { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
