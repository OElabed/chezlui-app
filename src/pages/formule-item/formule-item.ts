import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ItemCL } from "../../domain/chez-lui.model";
import { AbstractPublicPage } from "../common/AbstractPublicPage";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";

/**
 * Generated class for the FormuleItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-formule-item",
  templateUrl: "formule-item.html"
})
export class FormuleItemPage extends AbstractPublicPage {
  formule: ItemCL;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    super(navCtrl, settingsData, utilsService);
  }

  ionViewWillEnter() {
    super.ionViewDidEnter();
    this.formule = this.navParams.data.formule;
  }
}
