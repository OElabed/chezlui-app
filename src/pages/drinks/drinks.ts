import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-foods',
  templateUrl: 'foods.html'
})
export class DrinksPage {

  foodType: string = "salee";
  constructor(public navCtrl: NavController) {

  }
}
