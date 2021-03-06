import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { ChezLuiData } from "../../providers/chezlui-data";
import { SettingsData } from "../../providers/settings-data";
import { VipSettingsCL } from "../../domain/chez-lui.model";

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
  settings: VipSettingsCL = { active: false };

  original: VipSettingsCL = { active: false };

  espaceNormal: boolean = true;
  espaceVip: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chezLuiData: ChezLuiData,
    public settingsData: SettingsData,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidEnter() {
    this.settingsData.getVIPSettings().subscribe((vip: VipSettingsCL) => {
      this.original = {
        active: Boolean(vip.active)
      };
      this.settings = vip;

      this.espaceVip = this.settings.active;
      this.espaceNormal = !this.espaceVip;
    });
  }

  updateEspaceVip() {
    this.settings.active = this.espaceVip;
    this.espaceNormal = !this.espaceVip;
  }

  updateEspaceNormal() {
    this.settings.active = !this.espaceNormal;
    this.espaceVip = !this.espaceNormal;
  }

  maximumValue(item): boolean {
    if (!isNaN(item) && item <= 100) {
      return true;
    }
    return false;
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: "Mise à jour avec succès",
      duration: 1500
    });
    toast.present();
  }

  canUpdate() {
    if (
      Boolean(this.original.active) === Boolean(this.settings.active)
    ) {
      return false;
    }
    return true;
  }

  onUpdate(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      const settingToSave = {
        active: Boolean(this.settings.active)
      };
      this.settingsData
        .saveVIPSettings(settingToSave)
        .subscribe((data: boolean) => {
          this.presentToast();
          this.original = {
            active: Boolean(this.settings.active)
          };
        });
    }
  }
}
