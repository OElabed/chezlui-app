import { ScreenSaverPage } from "../screen-saver/screen-saver";
import { NavController } from "ionic-angular";
import { SettingsData } from "../../providers/settings-data";
import { VipSettingsCL, ItemCL } from "../../domain/chez-lui.model";
import { UtilService } from "../../services/utils-service";

const SCREEN_SAVER_RESET = 100;

export class AbstractPage {
  screenSaverCounter: number;
  isPageActive: boolean = false;

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
    this.loadVIPSettings();
  }

  loadVIPSettings() {
    this.settingsData.getVIPSettings().subscribe((vip: VipSettingsCL) => {
      this.vipActive = vip.active;
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

  getFinalPrice(item: ItemCL) {
    if (this.vipActive) {
      return item.price_vip;
    }
    return item.price;
  }
}
