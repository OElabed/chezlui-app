import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
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
  settings: SettingsCL = { delta: 4, active: false };

  espaceNormal: boolean = true;
  espaceVip: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chezLuiData: ChezLuiData,
    public settingsData: SettingsData,
    public toastCtrl: ToastController
  ) {
    this.settingsData.getVIPSettings().subscribe((vip: SettingsCL) => {
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
    if(!isNaN(item) && item <= 100) {
     return true;
    }
    return false;
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Mise à jour avec succès',
      duration: 1500
    });
    toast.present();
  }

  onUpdate(form: NgForm) {
    this.submitted = true;

    if (form.valid && this.maximumValue(this.settings.delta)) {
      this.settingsData.saveVIPSettings(this.settings).subscribe((data: boolean) => {
        this.presentToast();
      })
    }
  }
}
