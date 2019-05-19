import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alerts'
})
export class AlertsComponent implements OnInit {

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  async saveSuccess() {
    const alert = await this.alertController.create({ 
      subHeader: 'Subtitle', 
      buttons: ['OK']
    });

    await alert.present();
  }

}
