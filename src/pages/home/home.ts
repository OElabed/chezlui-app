import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FoodsPage } from "../foods/foods";
import { DrinksPage } from "../drinks/drinks";
import { HookahPage } from "../hookah/hookah";
import { InfosPage } from "../infos/infos";
import { UserData } from "../../providers/user-data";
import { SettingsPage } from "../settings/settings";
import { FormulePage } from "../formule/formule";
import { ScreenSaverPage } from "../screen-saver/screen-saver";

const SCREEN_SAVER_RESET = 40;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  screenSaverCounter: number;
  isPageActive: boolean = false;

  constructor(
    public navCtrl: NavController,
    public userDataProvider: UserData
  ) {}

  ionViewDidEnter() {
    this.screenSaverCounter = SCREEN_SAVER_RESET;
    this.isPageActive = true;
    this.timerScreenSaver();
  }

  ionViewDidLeave() {
    this.screenSaverCounter = 1;
    this.isPageActive = false;
  }

  globalInteraction() {
    this.screenSaverCounter = SCREEN_SAVER_RESET;
  }

  timerScreenSaver() {
    console.log(this.screenSaverCounter);
    if (this.isPageActive) {
      if (this.screenSaverCounter > 0) {
        setTimeout(() => {
          this.screenSaverCounter--;
          this.timerScreenSaver();
        }, 1000);
      } else {
        this.navCtrl.push(ScreenSaverPage);
      }
    }
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
