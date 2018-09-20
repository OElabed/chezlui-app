import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractPage } from '../common/AbstractPage';

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage extends AbstractPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }

}
