import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-foods',
  templateUrl: 'foods.html'
})
export class FoodsPage {

  foodType: string = "salee";
  constructor(public navCtrl: NavController) {

  }
}
