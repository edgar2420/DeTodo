import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonDatetime } from '@ionic/angular';
import { ChoferService } from 'src/app/services/chofer.service';
import { TripData, Stop } from 'src/app/models/Chofer';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {
  tripData: TripData = {
    name: '',
    latOrigin: 0,
    lngOrigin: 0,
    latDestination: 0,
    lngDestination: 0,
    date: '',
    price: 0,
    seats: 0,
    startTime: '',
    stops: []
  };

  mapCenterLat: number = 0;
  mapCenterLng: number = 0;
  zoom: number = 14;
  selectingOrigin: boolean = true;
  selectedPickupLat?: number;
  selectedPickupLng?: number;

  @ViewChild('pickupTime', { static: false }) pickupTime?: IonDatetime;

  constructor(
    private geolocation: Geolocation,
    private router: Router,
    private navCtrl: NavController,
    private choferService: ChoferService
  ) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenterLat = resp.coords.latitude;
      this.mapCenterLng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      if (this.selectingOrigin) {
        this.tripData.latOrigin = event.latLng.lat();
        this.tripData.lngOrigin = event.latLng.lng();
        this.selectingOrigin = false;
      } else {
        this.tripData.latDestination = event.latLng.lat();
        this.tripData.lngDestination = event.latLng.lng();
        this.selectingOrigin = true;
      }
    }
  }

  onPickupMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.selectedPickupLat = event.latLng.lat();
      this.selectedPickupLng = event.latLng.lng();
    }
  }

  addStop() {
    if (this.selectedPickupLat && this.selectedPickupLng && this.pickupTime) {
      const time = this.pickupTime.value as string;
      if (!time) {
        console.error('La hora de recogida es obligatoria');
        return;
      }

      const isoTime = new Date(time).toISOString();

      const stop: Stop = {
        lat: this.selectedPickupLat,
        lng: this.selectedPickupLng,
        time: isoTime
      };
      this.tripData.stops.push(stop);

      this.selectedPickupLat = undefined;
      this.selectedPickupLng = undefined;
      this.pickupTime.value = '';
    }
  }

  createTrip() {
    // Verificar que todos los campos necesarios estén presentes
    const requiredFields = ['name', 'latOrigin', 'lngOrigin', 'latDestination', 'lngDestination', 'date', 'price', 'seats', 'startTime'];
    for (const field of requiredFields) {
      if (!this.tripData[field]) {
        console.error(`El campo ${field} es obligatorio`);
        return;
      }
    }

    // Verificar que haya al menos un punto de recogida y que cada punto tenga lat, lng y time
    if (this.tripData.stops.length === 0) {
      console.error('Debe haber al menos un punto de recogida');
      return;
    }

    for (const [index, stop] of this.tripData.stops.entries()) {
      if (!stop.lat || !stop.lng || !stop.time) {
        console.error(`El campo lat, lng y time son obligatorios para la parada en la posición ${index}`);
        return;
      }
    }

    this.tripData.date = new Date(this.tripData.date).toISOString();
    this.tripData.startTime = new Date(this.tripData.startTime).toISOString();

    console.log('Datos del viaje:', this.tripData);

    this.choferService.createTrip(this.tripData).subscribe(
      response => {
        console.log('Viaje creado:', response);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al crear el viaje:', error);
      }
    );
  }
}
