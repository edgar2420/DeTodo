import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChoferService } from 'src/app/services/chofer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  formData = {
    fullname: '',
    email: '',
    password: '',
    vehicle_brand: '',
    vehicle_model: '',
    vehicle_color: '',
    vehicle_plate: ''
  };

  constructor(
    private choferService: ChoferService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async onClick() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      await this.showErrorMessage('Correo electrónico no válido');
      return;
    }

    if (this.formData.password.length < 6) {
      await this.showErrorMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (this.formData.password.includes(' ')) {
      await this.showErrorMessage('La contraseña no puede contener espacios');
      return;
    }

    this.choferService.registro(
      this.formData.fullname,
      this.formData.email,
      this.formData.password,
      this.formData.vehicle_brand,
      this.formData.vehicle_model,
      this.formData.vehicle_color,
      this.formData.vehicle_plate
    ).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      async (err) => {
        await this.showErrorMessage('Error al registrarse. Intente nuevamente.');
      }
    );
  }

  private async showErrorMessage(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
