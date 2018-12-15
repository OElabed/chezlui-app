import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AbstractPublicPage } from "../common/AbstractPublicPage";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";

@Component({
  selector: "page-infos",
  templateUrl: "infos.html"
})
export class InfosPage extends AbstractPublicPage {
  constructor(
    public navCtrl: NavController,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    super(navCtrl, settingsData, utilsService);
  }
}
