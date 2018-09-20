import { ScreenSaverPage } from "../screen-saver/screen-saver";
import { NavController } from "ionic-angular";

const SCREEN_SAVER_RESET = 40;

export class AbstractPage {
  screenSaverCounter: number;
  isPageActive: boolean = false;

  constructor(
    public navCtrl: NavController
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
}
