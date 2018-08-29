import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodsPage } from '../foods/foods';
import { DrinksPage } from '../drinks/drinks';
import { HookahPage } from '../hookah/hookah';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToFoods() {
    this.navCtrl.push(FoodsPage);
  }

  goToHookah() {
    this.navCtrl.push(HookahPage);
  }

  goToInformation() {
    console.log('inforamation');
  }

  goToDrinks() {
    this.navCtrl.push(DrinksPage);
  }

}
