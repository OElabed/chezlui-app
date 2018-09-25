import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AddPhotoPage } from "../add-photo/add-photo";
import { ChezLuiData } from "../../providers/chezlui-data";

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
export class PhotosPage {
  coucou: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: ChezLuiData
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PhotosPage");
  }

  goToAddPhoto() {
    this.navCtrl.push(AddPhotoPage);
  }
}
