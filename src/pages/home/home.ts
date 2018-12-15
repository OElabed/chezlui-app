import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FoodsPage } from "../foods/foods";
import { DrinksPage } from "../drinks/drinks";
import { HookahPage } from "../hookah/hookah";
import { InfosPage } from "../infos/infos";
import { UserData } from "../../providers/user-data";
import { SettingsPage } from "../settings/settings";
import { FormulePage } from "../formule/formule";
import { AbstractPublicPage } from "../common/AbstractPublicPage";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends AbstractPublicPage {
  constructor(
    public userDataProvider: UserData,
    public navCtrl: NavController,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    super(navCtrl, settingsData, utilsService);
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
