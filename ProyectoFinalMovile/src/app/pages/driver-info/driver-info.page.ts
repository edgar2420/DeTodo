import { Component, OnInit } from '@angular/core';
import { ChoferService } from 'src/app/services/chofer.service';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.page.html',
  styleUrls: ['./driver-info.page.scss'],
})
export class DriverInfoPage implements OnInit {

  driverInfo: any;
  vehicleInfo: any;

  constructor(private choferService: ChoferService) { }

  ngOnInit() {
    this.loadDriverInfo();
  }

  loadDriverInfo() {
    this.choferService.getDriverInfo().subscribe(
      (data) => {
        this.driverInfo = data;
        this.vehicleInfo = data.vehicles ? data.vehicles[0] : null; // Asume que hay al menos un vehículo
        console.log('Driver Info:', this.driverInfo);
        console.log('Vehicle Info:', this.vehicleInfo);
      },
      (err) => {
        console.error('Error loading driver info:', err);
      }
    );
  }
}

