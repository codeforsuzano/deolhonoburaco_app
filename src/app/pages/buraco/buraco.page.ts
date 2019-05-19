import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BuracoService } from './buraco.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-buraco',
  templateUrl: './buraco.page.html',
  styleUrls: ['./buraco.page.scss'],
})
export class BuracoPage implements OnInit {

  productForm: FormGroup;
  street:string='';

  photo = '';

  constructor(public api: BuracoService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private camera: Camera) {
      
  }

  startCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'street' : [null, Validators.required],
    });
  }

  async onFormSubmit(form:NgForm) {
    console.log(form);
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.addProduct(form)
      .subscribe(res => {
          loading.dismiss();
          
          this.router.navigate(['/home-results']);
        }, (err) => {
          console.log(err);
          loading.dismiss();
        });
  }

}
