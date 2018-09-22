import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AbstractPage } from "../common/AbstractPage";
import { SettingsData } from "../../providers/settings-data";

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-photos",
  templateUrl: "photos.html"
})
export class PhotosPage extends AbstractPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public settingsData: SettingsData
  ) {
    super(navCtrl, settingsData);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PhotosPage");
  }
}
