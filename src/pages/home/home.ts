import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodsPage } from '../foods/foods';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  goToRestaurant() {
    console.log('retaurant');
    this.navCtrl.push(FoodsPage);
  }

  goToChicha() {
    console.log('chicha');
  }

  goToInformation() {
    console.log('inforamation');
  }

  goToBoisson() {
    console.log('boissons');
  }

}
