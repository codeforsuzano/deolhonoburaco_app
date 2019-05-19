import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BuracoService } from './buraco.service';


@Component({
  selector: 'app-buraco',
  templateUrl: './buraco.page.html',
  styleUrls: ['./buraco.page.scss'],
})
export class BuracoPage implements OnInit {

  productForm: FormGroup;
  prod_name:string='';
  prod_desc:string='';
  prod_price:number=null;

  constructor(public api: BuracoService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'street' : [null, Validators.required],
      'photo' : [null, Validators.required],
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
