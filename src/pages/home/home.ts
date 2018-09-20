import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FoodsPage } from "../foods/foods";
import { DrinksPage } from "../drinks/drinks";
import { HookahPage } from "../hookah/hookah";
import { InfosPage } from "../infos/infos";
import { UserData } from "../../providers/user-data";
import { SettingsPage } from "../settings/settings";
import { FormulePage } from "../formule/formule";
import { AbstractPage } from "../common/AbstractPage";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends AbstractPage {
  constructor(
    public userDataProvider: UserData,
    public navCtrl: NavController
  ) {
    super(navCtrl);
  }

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

  goToFormules() {
    this.navCtrl.push(FormulePage);
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }
}
