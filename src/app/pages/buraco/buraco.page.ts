import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import axios from 'axios';
import { GlobalUrl } from 'src/app/globalurl';

@Component({
  selector: 'app-buraco',
  templateUrl: './buraco.page.html',
  styleUrls: ['./buraco.page.scss'],
})
export class BuracoPage implements OnInit {

  productForm: FormGroup;
  street:string='';
  proto:string='';

  photo:any;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private globalUrl: GlobalUrl
  ) {
      
  }

  startCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
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
      // 'street' : [null, Validators.required],
    });
  }

  async onFormSubmit(form:NgForm) {
    console.log(form.value);
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    await axios.post(`${this.globalUrl.baseAPIUrl}/buraco`, form.value).then( res => console.log(res.data))
        loading.dismiss();
   }

}
