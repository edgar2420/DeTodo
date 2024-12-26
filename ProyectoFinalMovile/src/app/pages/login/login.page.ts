import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChoferService } from 'src/app/services/chofer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formData = {
    email: '',
    password: ''
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

    this.choferService.login(this.formData.email, this.formData.password).subscribe(
      (data: { access_token: any; }) => {
        this.choferService.saveToken(data.access_token);
        this.router.navigate(['/home']);
      },
      async (err: { status: number; }) => {
        if (err.status === 401) {
          await this.showErrorMessage('Usuario o contraseña incorrectos. Verifique los datos.');
        }
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
