import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DrinksListPage } from '../drinks-list/drinks-list';

@Component({
  selector: 'page-drinks',
  templateUrl: 'drinks.html'
})
export class DrinksPage {

  constructor(public navCtrl: NavController) {

  }

  goToDrinkTypeList() {
    this.navCtrl.push(DrinksListPage);
  }

}
