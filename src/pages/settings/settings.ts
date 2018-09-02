import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { ChezLuiData } from "../../providers/chezlui-data";
import { SettingsData } from "../../providers/settings-data";
import { SettingsCL } from "../../domain/chez-lui.model";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  submitted = false;
  settings: SettingsCL = {delta: 4, active: false};

  espaceNormal: boolean = true;
  espaceVip: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chezLuiData: ChezLuiData,
    public settingsData: SettingsData
  ) {

    this.settingsData.getVIPSettings().subscribe((vip: SettingsCL) => {
      this.settings = vip;
    });
  }

  onUpdate(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
    }
  }
}
