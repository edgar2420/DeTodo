import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.page.html',
  styleUrls: ['./select-location.page.scss'],
})
export class SelectLocationPage implements OnInit {

  lat: number = 0; // Asigna un valor por defecto
  lng: number = 0; // Asigna un valor por defecto
  selectedLat: number = 0; // Asigna un valor por defecto
  selectedLng: number = 0; // Asigna un valor por defecto
  zoom: number = 14;

  constructor(private geolocation: Geolocation, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  mapClicked(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.selectedLat = event.latLng.lat();
      this.selectedLng = event.latLng.lng();
    }
  }

  confirmLocation() {
    this.navCtrl.navigateBack(['/create-trip'], {
      queryParams: {
        lat: this.selectedLat,
        lng: this.selectedLng
      }
    });
  }
}
