import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FoodsPage } from "../foods/foods";
import { DrinksPage } from "../drinks/drinks";
import { HookahPage } from "../hookah/hookah";
import { InfosPage } from "../infos/infos";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  goToFoods() {
    this.navCtrl.push(FoodsPage);
  }

  goToHookah() {
    this.navCtrl.push(HookahPage);
  }

  goToInformation() {
    this.navCtrl.push(InfosPage);
  }

  goToDrinks() {
    this.navCtrl.push(DrinksPage);
  }
}
