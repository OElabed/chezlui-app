import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AbstractPage } from "../common/AbstractPage";
import { SettingsData } from "../../providers/settings-data";

@Component({
  selector: "page-infos",
  templateUrl: "infos.html"
})
export class InfosPage extends AbstractPage {
  constructor(public navCtrl: NavController,
    public settingsData: SettingsData) {
    super(navCtrl, settingsData);
  }
}
