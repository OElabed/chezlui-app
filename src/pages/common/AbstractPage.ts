import { ScreenSaverPage } from "../screen-saver/screen-saver";
import { NavController } from "ionic-angular";
import { SettingsData } from "../../providers/settings-data";
import { VipSettingsCL } from "../../domain/chez-lui.model";
import { UtilService } from "../../services/utils-service";

const SCREEN_SAVER_RESET = 40;

export class AbstractPage {
  screenSaverCounter: number;
  isPageActive: boolean = false;

  basePrice: number = 0;
  vipActive: boolean = false;

  baseDataFolder: string = "";

  constructor(
    public navCtrl: NavController,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    this.baseDataFolder = this.utilsService.getBaseDataFolder();
  }

  ionViewDidEnter() {
    this.screenSaverCounter = SCREEN_SAVER_RESET;
    this.isPageActive = true;
    this.timerScreenSaver();
    this.loadBasePrice();
  }

  loadBasePrice() {
    this.settingsData.getVIPSettings().subscribe((vip: VipSettingsCL) => {
      this.vipActive = vip.active;
      if (vip.active) {
        this.basePrice = vip.delta;
      }
    });
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

  getFinalPrice(price: number) {
    return this.basePrice + price;
  }
}
